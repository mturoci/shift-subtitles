<script lang="ts">
  import {
    parseSrtFileContents,
    shiftTime,
    subtitleToSrt,
    type Subtitle,
    timeStringToSeconds,
    readFile,
  } from "../utils/srt";
  import FileUploadIcon from "../assets/upload-file-icon.svelte";
  import ArrowRight from "../assets/arrow-right.svelte";
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";

  const EDITOR_HEIGHT = "h-[calc(100vh-430px)] min-h-[300px]";
  let subtitles: Subtitle[] = [];
  let moveSeconds = 1;
  let fileName = "subtitles";
  let from = 1;
  let to = subtitles.length;
  let totalShifted = 0;
  $: to, (totalShifted = 0);
  $: from, (totalShifted = 0);

  async function handleFileUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) throw new Error("No files selected");

    const file = files[0];
    const contents = await readFile(file);
    subtitles = parseSrtFileContents(contents);
    fileName = file.name;
    to = subtitles.length;
  }
  const shift = (isBackward: boolean) => () => {
    const offset = isBackward ? -moveSeconds : moveSeconds;
    totalShifted += offset;
    subtitles = subtitles.map((subtitle, idx) => {
      if (idx < from - 1 || idx >= to) return subtitle;
      return {
        ...subtitle,
        from: shiftTime(subtitle.from, offset),
        to: shiftTime(subtitle.to, offset),
      };
    });
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
    document.body.appendChild(element); // Required for Firefox.
    element.click();
    document.body.removeChild(element);
  }
</script>

<div
  class="bg-white flex flex-wrap justify-center items-stretch p-5 rounded-xl bg-opacity-40"
>
  {#if subtitles.length}
    <ol class="max-h-full grow overflow-y-auto {EDITOR_HEIGHT} subtitles">
      {#each subtitles.slice((from || 1) - 1, to || subtitles.length) as subtitle, idx}
        <span
          class="float-left bg-secondary-600 mr-5 mt-[3px] h-6 min-w-[44px] rounded-full text-white text-center leading-7"
          >{idx + Number(from)}</span
        >
        <li class="mb-2 last:mb-0">
          <p class="text-sm text-gray-600">{subtitle.from} --> {subtitle.to}</p>
          <p class="text-m text-gray-700">{subtitle.text}</p>
        </li>
      {/each}
    </ol>
    <div class="xl:pl-5 basis-[500px]">
      <h2 class="text-2xl font-bold leading-10 tracking-wider text-center">
        Settings
      </h2>
      <Input val={fileName} type="text" label="File name" />
      <Input bind:val={from} type="text" label="Start shifting from" />
      <Input bind:val={to} type="text" label="End shifting at" />
      <Input val={moveSeconds} type="number" label="Seconds to shift" />

      <div class="flex items-center justify-between mt-5">
        <Button
          className="inline-flex flex-row-reverse items-center bg-secondary-500 hover:bg-secondary-600"
          label="Shift backward"
          onClick={shift(true)}
          disabled={timeStringToSeconds(subtitles[0].from) - moveSeconds < 0}
        >
          <ArrowRight className="w-3.5 h-3.5 mr-2 rotate-180" />
        </Button>
        <p class="tracking-wider text-2xl p-3">{totalShifted}s</p>
        <Button
          label="Shift forward"
          onClick={shift(false)}
          className="inline-flex items-center bg-secondary-500 hover:bg-secondary-600"
        >
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Button>
      </div>
      <Button
        label="Download"
        onClick={download}
        className="mt-5 block mx-auto px-10 bg-primary-600 hover:bg-primary-700"
      />
    </div>
  {:else}
    <label
      for="file-upload"
      class="flex grow flex-col items-center justify-center w-full border-2 border-secondary-600 border-dashed rounded-lg cursor-pointer {EDITOR_HEIGHT}"
    >
      <FileUploadIcon className="w-16 h-16 mb-4 text-secondary-600" />
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
