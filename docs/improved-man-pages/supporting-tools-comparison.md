# SUPPORTING TOOLS COMPARISON

These utilities exemplify the Unix philosophy of small, focused tools that do one thing well and work together through pipes.

| Command | Primary Purpose | Common Use Cases |
|---------|----------------|------------------|
| `tr`    | Character translation | Convert case, delete characters, squeeze repeats |
| `cut`   | Extract columns | Field extraction from tabular data |
| `rev`   | Reverse characters | Reverse each line character by character |
| `sort`  | Sort lines | Organize data, prepare for unique operations |
| `uniq`  | Report/filter repeated lines | Find unique/duplicate lines in sorted data |
| `xargs` | Build command lines | Execute commands with arguments from stdin |
| `tee`   | Duplicate output stream | Save output while also passing it to another command |
| `fold`  | Wrap lines | Format text to specific width |
| `yes`   | Repeat output | Automatically answer prompts, stress testing |
| `split` | Split files | Break large files into smaller pieces |
| `paste` | Merge lines | Combine columns from multiple files |

These tools are particularly powerful when combined in pipelines to transform and process text data efficiently.
