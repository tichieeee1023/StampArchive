import test from 'node:test';
import assert from 'node:assert/strict';
import { getStampCrop } from '../src/utils/getStampCrop.js';
import { createPostcardFilename } from '../src/utils/downloadPostcard.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

test('landscape image with horizontal cover overflow maps the click to stamp center', () => {
  const stamp = { stageWidth: 1000, stageHeight: 800, imageWidth: 2000, imageHeight: 1000, x: 250, y: 300 };
  const crop = getStampCrop(stamp);
  // The rendered image is 1600 x 800, starting at x = -300.
  close(crop.x + (550 / 1600) * crop.width, 60);
  close(crop.y + (300 / 800) * crop.height, 80);
});

test('portrait image with vertical cover overflow maps the click to stamp center', () => {
  const stamp = { stageWidth: 1200, stageHeight: 800, imageWidth: 1000, imageHeight: 2000, x: 800, y: 600 };
  const crop = getStampCrop(stamp, 16);
  close(crop.x + (800 / 1200) * crop.width, 60);
  close(crop.y + (1400 / 2400) * crop.height, 80);
});

test('different click positions preserve image scale and produce different crops', () => {
  const stamp = { stageWidth: 1000, stageHeight: 800, imageWidth: 2000, imageHeight: 1000, x: 100, y: 100 };
  const first = getStampCrop(stamp);
  const second = getStampCrop({ ...stamp, x: 800, y: 600 });
  assert.equal(first.width, second.width);
  assert.notEqual(first.x, second.x);
  assert.notEqual(first.y, second.y);
});

test('download filename uses a sortable local timestamp', () => {
  const filename = createPostcardFilename(new Date(2026, 8, 8, 14, 5, 9));
  assert.equal(filename, 'yoojin-postcard-20260908-140509.png');
});
