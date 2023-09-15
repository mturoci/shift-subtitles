<script lang="ts">
  import {
    parseSrtFileContents,
    shiftTime,
    subtitleToSrt,
    type Subtitle,
  } from "../utils/srtParser";

  let subtitles: Subtitle[] = [];
  let moveSeconds = 1;

  function handleFileUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) throw new Error("No files selected");

    const reader = new FileReader();
    reader.onload = () => {
      subtitles = parseSrtFileContents(reader.result as string);
    };
    reader.readAsText(files[0]);
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
    element.download = "subtitles.srt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }
</script>

<label for="file-upload">Upload SRT file:</label>
<input
  type="file"
  id="file-upload"
  accept=".srt"
  on:change={handleFileUpload}
/>

{#if subtitles.length}
  <h2>File contents:</h2>
  <div style="max-height: 200px; overflow-y: auto;">
    {#each subtitles as subtitle}
      <input type="text" value={subtitle.from} />
      <input type="text" value={subtitle.to} />
      <p>{subtitle.text}</p>
    {/each}
  </div>
  <button on:click={shift(true)}>Shift backward</button>
  <input type="number" bind:value={moveSeconds} />
  <button on:click={shift(false)}>Shift forward</button>
  <button on:click={download}>Download</button>
{/if}
