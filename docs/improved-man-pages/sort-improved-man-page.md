# SORT(1) User Commands

## NAME
**sort** - sort lines of text files

## QUICK START
```bash
# Simple sort
sort file.txt

# Sort numerically
sort -n numbers.txt

# Sort in reverse order
sort -r file.txt

# Sort by specific field (column)
sort -k2 file.txt

# Remove duplicates while sorting
sort -u file.txt
```

## VISUAL SYNTAX
```
sort [OPTION]... [FILE]...
```

## DESCRIPTION
The `sort` command sorts lines from all specified files together and writes the result to standard output. By default, it sorts in ascending order according to the character encoding. It can also merge already sorted files, check if files are already sorted, and remove duplicate lines.

## COMMONLY USED OPTIONS

### Sort Types
| Option | Description | Example |
|--------|-------------|---------|
| `-n`, `--numeric-sort` | Sort numerically | `sort -n numbers.txt` |
| `-g`, `--general-numeric-sort` | Sort according to general numerical value | `sort -g scientific.txt` |
| `-h`, `--human-numeric-sort` | Sort by human readable numbers (e.g., 2K, 1M) | `sort -h sizes.txt` |
| `-M`, `--month-sort` | Sort by month name | `sort -M months.txt` |
| `-V`, `--version-sort` | Sort by version numbers | `sort -V versions.txt` |
| `-R`, `--random-sort` | Shuffle, but group identical keys | `sort -R file.txt` |
| `--sort=WORD` | Sort according to WORD: general, month, numeric, etc. | `sort --sort=month dates.txt` |

### Sort Order
| Option | Description | Example |
|--------|-------------|---------|
| `-r`, `--reverse` | Reverse the result of comparisons | `sort -r file.txt` |
| `-f`, `--ignore-case` | Ignore case when sorting | `sort -f mixed_case.txt` |
| `-d`, `--dictionary-order` | Consider only blanks and alphanumeric characters | `sort -d file.txt` |
| `-i`, `--ignore-nonprinting` | Consider only printable characters | `sort -i file.txt` |
| `-b`, `--ignore-leading-blanks` | Ignore leading blanks | `sort -b file.txt` |

### Key Sorting
| Option | Description | Example |
|--------|-------------|---------|
| `-k POS1[,POS2]`, `--key=POS1[,POS2]` | Sort by key starting at POS1 and ending at POS2 | `sort -k2,2 file.txt` |
| `-t SEP`, `--field-separator=SEP` | Use SEP as field separator | `sort -t: -k3,3n /etc/passwd` |

### Output Control
| Option | Description | Example |
|--------|-------------|---------|
| `-u`, `--unique` | Output only the first of an equal run | `sort -u file.txt` |
| `-c`, `--check` | Check if input is sorted; no output | `sort -c file.txt` |
| `-C`, `--check=quiet` | Like -c, but no output and exit status | `sort -C file.txt` |
| `-s`, `--stable` | Stabilize sort by disabling last-resort comparison | `sort -s file.txt` |
| `-o FILE`, `--output=FILE` | Write result to FILE instead of standard output | `sort -o sorted.txt file.txt` |

### Other Options
| Option | Description | Example |
|--------|-------------|---------|
| `-m`, `--merge` | Merge already sorted files | `sort -m file1.txt file2.txt` |
| `--batch-size=NMERGE` | Maximum number of inputs to merge at once | `sort --batch-size=10 *.txt` |
| `--parallel=N` | Change the number of sorts run concurrently | `sort --parallel=4 large_file.txt` |
| `--buffer-size=SIZE` | Use SIZE for main memory buffer | `sort --buffer-size=1G huge_file.txt` |
| `--files0-from=F` | Read input from NUL-terminated names in file F | `sort --files0-from=file_list.txt` |

## KEY DEFINITION

When using the `-k` option, the format is:
```
-k POS1[OPTS][,POS2[OPTS]]
```

- `POS` is `F[.C]` where:
  - `F` is the field number (starting at 1)
  - `C` is the character position in the field (starting at 1)
- `OPTS` are single-letter ordering options:
  - `n` - numeric
  - `r` - reverse
  - `f` - ignore case
  - `b` - ignore leading blanks
  - Other single-letter options listed above

## PRACTICAL EXAMPLES

### Basic Sorting
```bash
# Simple alphabetical sort
sort file.txt

# Sort numbers properly
sort -n numbers.txt

# Sort in reverse order
sort -r file.txt

# Sort and remove duplicates
sort -u file.txt

# Sort and save result to a new file
sort -o sorted.txt file.txt
```

### Field Sorting
```bash
# Sort CSV by second field (numerically)
sort -t, -k2,2n data.csv

# Sort /etc/passwd by UID (3rd field)
sort -t: -k3,3n /etc/passwd

# Sort by first field, then second field
sort -k1,1 -k2,2n file.txt

# Sort IP addresses correctly
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ips.txt

# Sort by second field, ignoring case
sort -k2,2f file.txt
```

### Special Sort Types
```bash
# Sort human-readable file sizes
ls -lh | sort -k5,5h

# Sort version numbers
sort -V versions.txt

# Sort month names correctly
sort -M months.txt

# Sort floating point numbers
sort -g scientific.txt

# Random shuffle, but keeping identical lines together
sort -R file.txt
```

### Checking and Merging
```bash
# Check if file is already sorted
sort -c file.txt

# Check if file is sorted numerically
sort -cn numbers.txt

# Merge two already sorted files
sort -m sorted1.txt sorted2.txt

# Merge multiple sorted files
sort -m sorted*.txt
```

### Advanced Examples
```bash
# Sort based on multiple fields (name, then age)
sort -t, -k1,1 -k2,2n people.csv

# Sort directory by size (5th column of ls -l)
ls -l | sort -k5,5n

# Sort by frequency of occurrence (common technique)
cat file.txt | sort | uniq -c | sort -nr

# Sort by last name, then first name (comma-separated)
sort -t, -k2,2 -k1,1 names.csv

# Top 10 most frequent words
cat document.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr | head -10

# Sort processes by memory usage
ps aux | sort -k4,4nr

# Sort a log file by date (assuming yyyy-mm-dd format)
sort -k1,1 -k2,2 -k3,3 logfile.txt
```

### Performance Optimization
```bash
# Sort large file with increased buffer size
sort --buffer-size=1G large_file.txt

# Sort in parallel with 4 threads
sort --parallel=4 large_file.txt

# Sort multiple files efficiently
sort --batch-size=10 *.txt
```

## ENVIRONMENT
The behavior of `sort` is affected by the following environment variables:

- `LC_ALL`, `LC_COLLATE`, `LANG`: These affect the collation order used in sorting text strings
- `LC_NUMERIC`: Controls the recognition of numeric fields
- `LC_TIME`: Affects the sorting of dates and times
- `TMPDIR`: Location for temporary files
- `TMPDIR`: Specifies a directory to use for temporary files when sorting large files

## SEE ALSO
- `uniq` - Report or omit repeated lines
- `comm` - Compare two sorted files line by line
- `join` - Join lines of two files on a common field
- `shuf` - Generate random permutations
- `lsort` - Sort lines of all the given files together
- `tsort` - Topological sort

## TIPS
- Use `-u` to remove duplicates while sorting (equivalent to `sort | uniq`)
- When sorting by multiple fields, specify each field with its own `-k` option
- For CSV files, specify the delimiter with `-t,` and refer to columns with `-k`
- The `-s` (stable) option is useful when sorting on multiple keys to preserve relative order
- For large files, increase buffer size with `--buffer-size` and use parallel processing
- Use `-h` for "human-readable" sizes (like 1K, 234M, 2G)
- With versioned files, `-V` properly sorts version numbers (e.g., 1.10 comes after 1.9)
- Field numbers start at 1, not 0
- Remember that `-n` sorts numbers as numbers, not as strings (important for values like "10" vs "2")

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `sort: cannot read: No such file or directory` | File doesn't exist | Check filename and path |
| `sort: write failed: No space left on device` | Out of disk space | Free up disk space or use different tmp dir |
| Unexpected sort order | Wrong sort type | Use -n for numbers, -V for versions, etc. |
| Case sensitivity issues | Default sort is case sensitive | Add -f to ignore case |
| Leading spaces affecting sort | Space characters counted in sorting | Use -b to ignore leading blanks |
| Numbers not sorting correctly | String sorting instead of numeric | Use -n for numeric sorting |
| Incorrect field sorting | Field separator not specified | Use -t to specify field separator |
| Memory errors on large files | Insufficient memory | Use --buffer-size and --parallel options |

## VERSION DIFFERENCES
- **GNU sort** (Linux): Has all the features described above
- **BSD sort** (macOS): May have fewer options or different behavior for some options
- **POSIX sort**: Standardized subset of features supported across platforms

Notable differences:
- The `--parallel` option is GNU-specific
- The `-h` (human-numeric) option may not be available in all implementations
- The `-V` (version) option is GNU-specific
- The `-R` (random) option behavior may differ between implementations
- Buffer size management differs between versions
