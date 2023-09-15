<script lang="ts">
  import {
    parseSrtFileContents,
    shiftTime,
    subtitleToSrt,
    type Subtitle,
  } from "../utils/srtParser";
  import FileUploadIcon from "../assets/upload-file-icon.svelte";
  import ArrowRight from "../assets/arrow-right.svelte";
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";

  const EDITOR_HEIGHT = "h-[calc(100vh-350px)] min-h-[300px]";
  let subtitles: Subtitle[] = [];
  let moveSeconds = 1;
  let fileName = "subtitles";

  function handleFileUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) throw new Error("No files selected");

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      subtitles = parseSrtFileContents(reader.result as string);
    };
    reader.readAsText(file);
    fileName = file.name;
  }
  const shift = (isBackward: boolean) => () => {
    const offset = isBackward ? -moveSeconds : moveSeconds;
    subtitles = subtitles.map((subtitle) => ({
      ...subtitle,
      from: shiftTime(subtitle.from, offset),
      to: shiftTime(subtitle.to, offset),
    }));
  };

  function download() {
    const element = document.createElement("a");
    const file = new Blob(
      [
        subtitles
          .map((subtitle, idx) => subtitleToSrt(subtitle, idx + 1))
          .join("\n"),
      ],
      {
        type: "text/plain",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for FireFox.
    element.click();
    document.body.removeChild(element);
  }
</script>

<div
  class="bg-white flex flex-wrap justify-center items-stretch p-5 rounded-xl bg-opacity-40"
>
  {#if subtitles.length}
    <div class="flex flex-col max-h-full grow overflow-y-auto {EDITOR_HEIGHT}">
      {#each subtitles as subtitle}
        <div class="mb-2 last:mb-0">
          <p class="text-sm text-gray-600">{subtitle.from} --> {subtitle.to}</p>
          <p class="text-m text-gray-700">{subtitle.text}</p>
        </div>
      {/each}
    </div>
    <div class="px-2 basis-[500px]">
      <h2 class="text-2xl font-bold leading-10 tracking-wider text-center">
        Settings
      </h2>
      <Input value={fileName} type="text" label="File name" />
      <Input value={moveSeconds} type="number" label="Seconds to shift" />

      <div class="flex justify-evenly mt-5">
        <Button
          className="inline-flex flex-row-reverse items-center bg-secondary"
          label="Shift backward"
          onClick={shift(true)}
        >
          <ArrowRight className="w-3.5 h-3.5 mr-2 rotate-180" />
        </Button>
        <Button
          label="Shift forward"
          onClick={shift(false)}
          className="inline-flex items-center bg-secondary"
        >
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Button>
      </div>
      <Button
        label="Download"
        onClick={download}
        className="mt-5 block mx-auto px-10 bg-primary"
      />
    </div>
  {:else}
    <label
      for="file-upload"
      class="flex grow flex-col items-center justify-center w-full border-2 border-green-700 border-dashed rounded-lg cursor-pointer {EDITOR_HEIGHT}"
    >
      <FileUploadIcon className="w-16 h-16 mb-4 text-green-700" />
      <p class="mb-2 text-sm text-gray-700">Click to upload or drag and drop</p>
      <p class="text-xs text-gray-600">SRT files only</p>
      <input
        class="hidden"
        type="file"
        id="file-upload"
        accept=".srt"
        on:change={handleFileUpload}
      />
    </label>
  {/if}
</div>
