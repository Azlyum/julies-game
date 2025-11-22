import { Howl } from "howler";

export const backgroundMusicSound_v2 = new Howl({
  src: "./sounds/backgroundMusic_v2.mp3",
  loop: true,
  volume: 0.2,
});

export const mainMenuSound = new Howl({
  src: "./sounds/mainTheme.mp3",
  loop: true,
  volume: 0.1,
});

export const barkSound = new Howl({
  src: "./sounds/bark.mp3",
  volume: 0.2,
});

export const goblinScreamSound = new Howl({
  src: "./sounds/goblinScream.mp3",
  volume: 0.08,
});

export const pigOinkSound = new Howl({
  src: "./sounds/pigOink.mp3",
  volume: 0.2,
});

export const scaredHogSound = new Howl({
  src: "./sounds/scaredHog.mp3",
  volume: 0.2,
});
