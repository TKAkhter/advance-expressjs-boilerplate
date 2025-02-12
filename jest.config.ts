/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

/** @type {import('jest').Config} */
const jestConfig: JestConfigWithTsJest = {
  // All imported modules in your tests should be mocked automatically
  // Automock: false,

  // Stop running tests after `n` failures
  // Bail: 0,

  // The directory where Jest should store its cached dependency information
  // CacheDirectory: "/private/var/folders/b9/m478lz_d2632k8g9wfsm5lj00000gn/T/jest_dx",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // CollectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // CollectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  // CoverageDirectory: undefined,

  // An array of regexp pattern strings used to skip coverage collection
  // CoveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  // CoverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // CoverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // CoverageThreshold: undefined,

  // A path to a custom dependency extractor
  // DependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // ErrorOnDeprecated: false,

  // The default configuration for fake timers
  // FakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // ForceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // GlobalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // GlobalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // Globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // MaxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules", "./src"],

  // An array of file extensions your modules use
  // ModuleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // ModulePathIgnorePatterns: [],

  // Activates notifications for test results
  // Notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // NotifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // Run tests from one or more projects
  // Projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  reporters: ["default"],

  // Automatically reset mock state before every test
  // ResetMocks: false,

  // Reset the module registry before running each individual test
  // ResetModules: false,

  // A path to a custom resolver
  // Resolver: undefined,

  // Automatically restore mock state and implementation before every test
  // RestoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // RootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // Roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // Runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // SetupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // SlowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // SnapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Options that will be passed to the testEnvironment
  // TestEnvironmentOptions: {},

  // Adds a location field to test results
  // TestLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // TestMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // TestPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // TestRegex: [],

  // This option allows the use of a custom results processor
  // TestResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // TestRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  // Transform: undefined,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // TransformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // UnmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // Verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // WatchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // Watchman: true,
  testTimeout: 30000,
  // Silent: true,
  detectOpenHandles: true,
  forceExit: true,
};

export default jestConfig;
