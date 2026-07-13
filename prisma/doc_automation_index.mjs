// Tổng hợp bài AUTOMATION TESTING (do luồng "đủ 30/loại" quản lý). Thêm bài mới:
// import ở đây + spread vào AUTOMATION_DOCS. sync_docs chỉ import 1 mảng này -> ít
// đụng phần CNM của skill khác trong SOURCES.
import { AU_INTRO_01 } from "./doc_au_intro.mjs";
import { AU_POM_01 } from "./doc_au_pom.mjs";
import { AU_LOCATORS_01 } from "./doc_au_locators.mjs";
import { AU_WAITS_01 } from "./doc_au_waits.mjs";
import { AU_ASSERTION_01 } from "./doc_au_assertion.mjs";
import { AU_RUNNER_01 } from "./doc_au_runner.mjs";

export const AUTOMATION_DOCS = [
  ...AU_INTRO_01,
  ...AU_POM_01,
  ...AU_LOCATORS_01,
  ...AU_WAITS_01,
  ...AU_ASSERTION_01,
  ...AU_RUNNER_01,
];
