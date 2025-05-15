# FIND(1) User Commands

## NAME
**find** - search for files in a directory hierarchy

## QUICK START
```bash
# Find files by name in current directory and below
find . -name "filename.txt"

# Find files by type (f=regular file, d=directory)
find /path/to/search -type f

# Find files modified in the last 24 hours
find ~ -mtime -1

# Find and execute a command on each result
find . -name "*.log" -exec rm {} \;
```

## VISUAL SYNTAX
```
find [starting-point...] [expression]
```

## DESCRIPTION
The `find` command searches directory trees for files matching the specified criteria and performs selected actions on the files found. It starts its search from the given starting points (directories) and recursively traverses all subdirectories.

## COMMONLY USED OPTIONS

### Search Locations
| Option | Description | Example |
|--------|-------------|---------|
| `.` | Current directory and below | `find .` |
| `/` | Root directory and below | `find /` |
| `~` | Home directory and below | `find ~` |
| *path* | Specific path and below | `find /var/log` |
| Multiple paths | Search multiple locations | `find /etc /home /var` |

### Search by Name and Path
| Option | Description | Example |
|--------|-------------|---------|
| `-name "pattern"` | Match filename using shell pattern | `find . -name "*.txt"` |
| `-iname "pattern"` | Like -name but case-insensitive | `find . -iname "*.JPG"` |
| `-path "pattern"` | Match full path using shell pattern | `find . -path "*/test/*"` |
| `-regex "pattern"` | Match full path using regex | `find . -regex ".*\.log$"` |

### Search by Type
| Option | Description | Example |
|--------|-------------|---------|
| `-type f` | Regular files | `find . -type f` |
| `-type d` | Directories | `find . -type d` |
| `-type l` | Symbolic links | `find . -type l` |
| `-type b` | Block devices | `find . -type b` |
| `-type c` | Character devices | `find . -type c` |
| `-type p` | Named pipes (FIFOs) | `find . -type p` |
| `-type s` | Sockets | `find . -type s` |

### Search by Size
| Option | Description | Example |
|--------|-------------|---------|
| `-size n[cwbkMG]` | Exactly n units | `find . -size 10M` |
| `-size +n[cwbkMG]` | Greater than n units | `find . -size +5G` |
| `-size -n[cwbkMG]` | Less than n units | `find . -size -1k` |

**Size units:**
- `c`: bytes
- `w`: 2-byte words
- `b`: 512-byte blocks (default)
- `k`: kilobytes (1024 bytes)
- `M`: megabytes (1048576 bytes)
- `G`: gigabytes (1073741824 bytes)

### Search by Time
| Option | Description | Example |
|--------|-------------|---------|
| `-mtime n` | File was modified exactly n days ago | `find . -mtime 1` |
| `-mtime +n` | File was modified more than n days ago | `find . -mtime +30` |
| `-mtime -n` | File was modified less than n days ago | `find . -mtime -7` |
| `-mmin n` | File was modified exactly n minutes ago | `find . -mmin 5` |
| `-atime n/+n/-n` | Access time in days | `find . -atime -1` |
| `-amin n/+n/-n` | Access time in minutes | `find . -amin -30` |
| `-ctime n/+n/-n` | Change time in days | `find . -ctime +14` |
| `-cmin n/+n/-n` | Change time in minutes | `find . -cmin -5` |
| `-newer file` | Modified more recently than file | `find . -newer reference.txt` |

### Search by Permissions and Ownership
| Option | Description | Example |
|--------|-------------|---------|
| `-perm mode` | Exact permissions match | `find . -perm 644` |
| `-perm -mode` | All bits in mode are set | `find . -perm -u+x` |
| `-perm /mode` | Any bits in mode are set | `find . -perm /u=x` |
| `-user username` | Owned by username | `find . -user john` |
| `-group groupname` | Owned by group | `find . -group developers` |

### Logical Operators
| Option | Description | Example |
|--------|-------------|---------|
| `-a` or `-and` | Logical AND (default) | `find . -name "*.txt" -and -size +1M` |
| `-o` or `-or` | Logical OR | `find . -name "*.jpg" -or -name "*.png"` |
| `!` or `-not` | Logical NOT | `find . -not -name "*.log"` |
| `( ... )` | Group expressions | `find . \( -name "*.jpg" -o -name "*.png" \) -size +1M` |

### Actions
| Option | Description | Example |
|--------|-------------|---------|
| `-print` | Print full path (default) | `find . -name "*.txt" -print` |
| `-ls` | List in ls -dils format | `find . -type f -ls` |
| `-exec cmd {} \;` | Execute command on each file | `find . -name "*.tmp" -exec rm {} \;` |
| `-exec cmd {} +` | Execute command with all files | `find . -name "*.jpg" -exec convert {} {}.png \;` |
| `-ok cmd {} \;` | Like -exec but prompt user | `find . -name "*.bak" -ok rm {} \;` |
| `-delete` | Delete matching files | `find . -name "*.tmp" -delete` |

## REGULAR EXPRESSIONS

When using `-regex` or `-iregex`, find matches the whole path string against the given regular expression. The default regex type is Emacs, but can be changed with `-regextype`.

Common regex types include:
- `emacs` (default): Emacs-style regex
- `posix-basic`: POSIX basic regex
- `posix-extended`: POSIX extended regex
- `posix-awk`: POSIX AWK regex

Example with extended regex:
```bash
find . -regextype posix-extended -regex ".*(\.jpg|\.png)$"
```

## PRACTICAL EXAMPLES

### File Management
```bash
# Find and delete all empty files
find . -type f -empty -delete

# Find and delete files older than 30 days
find /tmp -type f -mtime +30 -delete

# Find files larger than 100MB
find /home -type f -size +100M

# Find files modified in the last 24 hours
find /var/log -type f -mtime -1

# Find files with specific permissions
find /etc -type f -perm 644
```

### Search and Filter
```bash
# Find all .jpg and .png files
find . \( -name "*.jpg" -o -name "*.png" \)

# Find files containing "error" text
find . -type f -exec grep -l "error" {} \;

# Find all executable scripts
find /usr/local/bin -type f -perm /u+x

# Find all broken symlinks
find /usr/local -type l ! -exec test -e {} \; -print

# Find files not accessed in the last 90 days
find ~/Documents -type f -atime +90
```

### Complex Examples
```bash
# Find files modified in the last hour and copy them to backup
find /src -type f -mmin -60 -exec cp {} /backup \;

# Find large log files and compress them
find /var/log -name "*.log" -size +50M -exec gzip {} \;

# Find and replace text in multiple files
find . -name "*.html" -exec sed -i 's/old/new/g' {} \;

# Find directories with specific permissions and fix them
find /home -type d -perm 777 -exec chmod 755 {} \;

# Find specific file types and create a tar archive
find . \( -name "*.jpg" -o -name "*.png" \) -exec tar -rvf images.tar {} \;
```

### Using With Other Commands
```bash
# Count files by type using find and grep
find . -type f | grep -E "\.(jpg|png|gif)$" | wc -l

# Find the largest files in a directory
find . -type f -exec du -h {} \; | sort -rh | head -10

# Create a list of all files sorted by modification time
find . -type f -printf "%T@ %p\n" | sort -n | cut -d' ' -f2-

# Find duplicated files (by size and then MD5)
find . -type f -exec md5sum {} \; | sort | uniq -w32 -d

# Find and process files in batches
find . -name "*.jpg" -print0 | xargs -0 -P4 -n10 mogrify -resize 800x600
```

## ENVIRONMENT
The behavior of `find` is affected by the following environment variables:

- `PATH`: Used when executing commands with `-exec` and `-ok`
- `LC_COLLATE`, `LC_CTYPE`, `LC_TIME`, `LC_ALL`, `LANG`: Affect pattern matching and time display
- `POSIXLY_CORRECT`: Affects the treatment of paths specified on the command line
- `TZ`: Timezone used for time-based searches

## SEE ALSO
- `locate` - Find files by name quickly using database
- `xargs` - Build and execute command lines from standard input
- `grep` - Search text within files
- `ls` - List directory contents
- `chmod` - Change file permissions
- `test` - Check file types and compare values

## TIPS
- When using complex expressions with special characters like `()`, `!`, or `{}`, escape them with backslashes or quote them.
- The `-exec` option runs a separate command for each file found, which can be slow for many files. Use `-exec cmd {} +` to run fewer commands by batching files.
- For better performance with pattern matching, be as specific as possible about your search paths.
- Use `-print0` with `xargs -0` when filenames might contain spaces or special characters.
- The order of options matters! Put selection criteria before actions.
- Use `-maxdepth` and `-mindepth` to limit directory traversal depth.
- Add `-type f` when you want to find only regular files (excludes directories, symlinks, etc).

## COMMON ERRORS

| Error | Cause | Solution |
|-------|-------|----------|
| `find: paths must precede expression` | Expression option used before the path | Reorder your command to put paths first |
| `find: missing argument to '-exec'` | Forgot to end `-exec` with `\;` or `+` | Add proper termination to `-exec` command |
| `find: unknown predicate '-option'` | Typo or unsupported option | Check option spelling and man page for correct syntax |
| `find: Permission denied` | Can't access directories due to permissions | Use `sudo` or add `-type f -readable` to skip unreadable items |
| Nothing found despite files existing | Wrong pattern syntax or escaping issues | Double-check wildcards and quoting in patterns |

## VERSION DIFFERENCES
- **GNU find** (Linux): Has the most features and options.
- **BSD find** (macOS): Has some syntax differences, particularly with `-perm` and regexes.
- **POSIX find**: Has standardized subset of features supported across platforms.

Notable differences:
- The `-path` and `-wholename` options work differently between GNU and BSD.
- The `-regex` behavior and defaults vary by implementation.
- BSD find might not support `-delete` or `-regextype`.
- Option `-print` is implicit in GNU find but may need to be explicit in others.
