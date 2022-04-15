## How I worked on this project

My goal was to build a command line node.js application, which parses the input log file.
The application finds all the log messages with the level error and prints them into the output file.

## Design and Development Approach

### Design

- The scope of the application was simple. It’s a command line app that should
  read logs from an input file (like ./app.log ), extract level error logs and store them in the errors.json file in a specific format, with the following usage:
  ` > node parser.js --input ./app.log --output ./errors.json`

- Object Oriented Design was used to define the core objects of the app:
  - **FileReader**: responsible for reading the contents of the input file (`./app.log`)
  - **ErrorExtractor**: responsible for extracting the messages with the level error
  - **FileWriter**: responsible for writing the error messages to the output file (`./errors.json`)
  - **LogParser**: responsible for orchestration. It coordinates the file reading, error extraction, and file writing operations.
  - **ConsoleLogger**: responsible for logging relevant notification messages to the command line.
- SOLID, DRY, and SLAP principles were applied to keep the code extendable and
  clean

### Test Driven Development

- Unit Test cases for each object were written before developing the classes. Jest was used as a testing tool due to its efficient mocking capability
- TypeScript and Nodejs were used to develop the app

## How to navigate this project

- **parser.ts** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/parser.ts))
  Entry point of the app that collects inputs from the command line, creates instances of the reader, error extractor, writer and passes them to the parser object.

- **FileReader.ts** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/reader/FileReader.ts#L1))
  Reads the file line-by-line for memory efficiency especially when the input file becomes large. It uses a helper generator function to achieve this.

  - [View code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/helpers/helper-functions.ts#L3) for helper function

- **ErrorExtractor.ts** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/transformer/ErrorExtractor.ts#L1))
  Extracts level error messages from the logs.

- **FileWriter.ts** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/writer/FileWriter.ts#L1))
  Writes the output messages to a destination file.

- **LogParser.ts** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/parser/LogParser.ts#L1))
  Coordinates the actions of the reader, error extractor and writer. View code.

- **Interfaces** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/tree/main/src/interfaces))
  Built to apply the SOLID principles of Interface Segregation and Dependency Injection. Also includes interfaces to define data types for the app.

- **Unit tests** ([view code](https://github.com/Lambertyubin/log-parser-with-typescript/tree/main/tests/unit-tests)):
  Partially covered, to be completed.

- **Integration tests**: to be added

## Usage

### Step 1: Install dependencies

- `npm install`

### Step 2: Navigate to src directory

- `cd src`

### Step 3: Run the app from command line:

- `node parser.js --input ./app.log --output ./errors.json`

  The `./app.log` is the path to the input file in this case, while `./errors.json` is the path where we want to store our output.
  [Click here](https://github.com/Lambertyubin/log-parser-with-typescript/blob/main/src/app.log) to view a sample input format.
