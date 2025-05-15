# CUT(1) User Commands

## NAME
**cut** - remove sections from each line of files

## QUICK START
```bash
# Extract characters 1-10 from each line
cut -c1-10 file.txt

# Extract specific columns from CSV file
cut -d, -f1,3 data.csv

# Extract fields 2 and 4 from space-delimited file
cut -f2,4 -d' ' file.txt

# Extract first field from colon-separated file
cut -d: -f1 /etc/passwd
```

## VISUAL SYNTAX
```
cut OPTION... [FILE]...
```

## DESCRIPTION
The `cut` command extracts portions of lines from a file or standard input. It can select by character position, by delimiter-separated fields, or by bytes. By default, `cut` outputs the selected portions to standard output.

## COMMONLY USED OPTIONS

| Option | Description | Example |
|--------|-------------|---------|
| `-b LIST`, `--bytes=LIST` | Select only these bytes | `cut -b1-5 file.txt` |
| `-c LIST`, `--characters=LIST` | Select only these characters | `cut -c1-10,15,20- file.txt` |
| `-d DELIM`, `--delimiter=DELIM` | Use DELIM as the field delimiter | `cut -d, -f1,3 data.csv` |
| `-f LIST`, `--fields=LIST` | Select only these fields | `cut -f1-3,5 -d: file.txt` |
| `-s`, `--only-delimited` | Only print lines containing delimiters | `cut -d, -f1 -s data.csv` |
| `--complement` | Complement the set of selected bytes, chars, or fields | `cut -d, -f2 --complement data.csv` |
| `--output-delimiter=STRING` | Use STRING as the output delimiter | `cut -d, -f1,3 --output-delimiter=: data.csv` |

### LIST Format
| Format | Description | Example |
|--------|-------------|---------|
| `N` | Single number N | `-f5` (field 5) |
| `N-` | From N to end of line | `-c3-` (chars 3 to end) |
| `N-M` | From N to M (inclusive) | `-f2-5` (fields 2,3,4,5) |
| `N,M,...` | Only positions N, M, etc. | `-c1,5,10` (chars 1,5,10) |
| `-M` | From beginning to M | `-c-5` (chars 1 to 5) |
| `N-M,X-Y` | Combinations of above | `-f1-3,5,7-` (fields 1,2,3,5,7 to end) |

## PRACTICAL EXAMPLES

### Working with Character Positions
```bash
# Extract first 5 characters from each line
cut -c1-5 file.txt

# Extract characters 5 to end of line
cut -c5- file.txt

# Extract specific characters
cut -c1,3,5-7 file.txt

# Exclude the first 3 characters
cut -c4- file.txt

# Select everything except characters 5-10
cut -c1-4,11- file.txt
```

### Working with Delimited Fields
```bash
# Extract first column from CSV
cut -d, -f1 data.csv

# Extract username and shell from /etc/passwd
cut -d: -f1,7 /etc/passwd

# Extract multiple fields
cut -d, -f1-3,5 data.csv

# Extract last field from CSV
cut -d, -f$(head -n1 data.csv | tr ',' '\n' | wc -l) data.csv

# Extract all fields except the second
cut -d, -f2 --complement data.csv
```

### Combining with Other Tools
```bash
# Count unique usernames
cut -d: -f1 /etc/passwd | sort | uniq | wc -l

# Extract HTTP status codes from logs
cut -d' ' -f9 access.log | sort | uniq -c | sort -nr

# Extract and sort IP addresses
cut -d' ' -f1 access.log | sort | uniq

# Extract specific columns and convert to CSV
cut -f1,3,5 data.txt | tr '\t' ','

# Extract domain names from URLs
cut -d/ -f3 urls.txt

# Extract specific environment variable values
env | grep PATH | cut -d= -f2
```

### Advanced Examples
```bash
# Change output delimiter
cut -d, -f1,3 data.csv --output-delimiter=:

# Extract non-empty fields only
cut -d, -f1 -s data.csv

# Extract keys from a property file
cut -d= -f1 config.properties

# Format columns with custom width
cut -c1-20,21-40,41-60 data.txt | pr -t -3

# Extract date from log file
cut -d' ' -f1-3 logfile.txt

# Extract specific fields from fixed-width data
cut -c1-10,15-25,30-40 fixed-width.dat
```

## ENVIRONMENT
The behavior of `cut` is affected by the following environment variables:

- `LC_ALL`, `LC_CTYPE`, `LANG`: These affect the interpretation of character classes and byte sequences.

## SEE ALSO
- `paste` - Merge lines of files
- `awk` - Pattern scanning and processing language
- `tr` - Translate or delete characters
- `colrm` - Remove columns from a file
- `column` - Columnate lists
- `expand` - Convert tabs to spaces
- `join` - Join lines of two files on a common field

## TIPS
- Use `cut` for simple field extraction; for more complex operations, consider `awk`
- When working with CSV files with quoted fields containing delimiters, `cut` may not work correctly—use `csvkit` or `awk` instead
- For fixed-width data, character-based cutting (`-c`) is more reliable than byte-based (`-b`)
- The `-s` option is useful when you only want lines that contain the delimiter
- Remember that `cut` doesn't rearrange fields—it only selects them in their original order
- Use `--output-delimiter` to control the format of the output
- For tab-delimited files, you can omit the `-d` option as tab is the default delimiter for `-f`
- When using `cut` with pipes, remember it processes the output of the previous command

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `cut: fields and positions are numbered from 1` | Using zero as a field/position number | Use 1-based numbering |
| `cut: invalid field value 'X'` | Invalid field specification | Check LIST format |
| `cut: the delimiter must be a single character` | Multi-character delimiter | Use single-character delimiter |
| No output when expected | No lines contain the delimiter | Use `-s` to suppress lines without delimiters |
| Unexpected output with CSV | Quoted fields containing delimiters | Use a CSV-aware tool instead |
| Incorrect byte extraction with UTF-8 | Characters span multiple bytes | Use character-based (`-c`) instead of byte-based (`-b`) |

## VERSION DIFFERENCES
- **GNU cut** (Linux): Has all the features described above
- **BSD cut** (macOS): May have fewer options (e.g., might not support `--complement`)
- **POSIX cut**: Standardized subset of features supported across platforms

Notable differences:
- The `--complement` option is only available in GNU cut
- The `--output-delimiter` option may not be available in all implementations
- Some versions might not handle UTF-8 correctly with byte selection (`-b`)
