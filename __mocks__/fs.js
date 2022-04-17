"use strict";

const path = require("path");

const fs = jest.createMockFromModule("fs");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    let content = newMockFiles[file];
    if (!mockFiles[file]) {
      mockFiles[file] = [];
    }
    mockFiles[file].push(content);
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readFileSync(fileName) {
  return mockFiles[fileName] || [];
}

function existsSync(fileName) {
  return mockFiles[fileName] !== undefined;
}

function appendFileSync(fileName, data) {
  if (!mockFiles[fileName]) {
    mockFiles[fileName] = [];
  }
  mockFiles[fileName].push(data);
}

function writeFileSync(fileName, data) {
  mockFiles[fileName] = [];
  mockFiles[fileName].push(data);
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;
fs.existsSync = existsSync;
fs.appendFileSync = appendFileSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
