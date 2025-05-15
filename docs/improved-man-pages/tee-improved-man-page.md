# TEE(1) Enhanced Manual Page

## NAME
**tee** - read from standard input and write to both standard output and files

## QUICK START
```bash
# Write output to both the terminal and a file
echo "Hello World" | tee output.txt

# Append to existing files rather than overwriting
ls -la | tee -a log.txt

# Write to multiple files at once
cat document.txt | tee file1.txt file2.txt file3.txt
```

## VISUAL SYNTAX
```
tee [OPTIONS] [FILE...]
 │      │       │
 │      │       └─ One or more files to write to (in addition to stdout)
 │      └─ Options modifying tee behavior
 └─ The tee command itself
```

## DESCRIPTION
`tee` is a command that reads from standard input and writes to both standard output and one or more files simultaneously. Its name comes from plumbing terminology where a T-shaped pipe fitting allows a stream to be diverted in two directions.

This command is particularly useful in pipelines where you want to see the output of a command on your terminal while also saving it to a file, or when you need to send the same data to multiple destinations.

## COMMONLY USED OPTIONS

| Short | Long             | Description                                      | Example                                |
|-------|------------------|--------------------------------------------------|----------------------------------------|
| `-a`  | `--append`       | Append to files rather than overwriting them     | `echo "new line" \| tee -a log.txt`    |
| `-i`  | `--ignore-interrupts` | Ignore interrupt signals                   | `long_cmd \| tee -i output.txt`        |
| `-p`  | `--output-error` | Diagnose errors writing to non-pipes             | `echo "test" \| tee -p output.txt`     |

*Note: GNU version of `tee` has additional options that may not be available on all systems.*

## DATA FLOW VISUALIZATION

```
  ┌─────────┐         ┌─────┐         ┌─────────┐
  │ Command │ stdout  │     │ stdout  │ Terminal│
  │ Output  │────────>│ tee │────────>│ Display │
  └─────────┘         │     │         └─────────┘
                      │     │
                      │     │         ┌─────────┐
                      │     │────────>│ File 1  │
                      │     │         └─────────┘
                      │     │
                      │     │         ┌─────────┐
                      │     │────────>│ File 2  │
                      └─────┘         └─────────┘
```

## PRACTICAL EXAMPLES

### Basic Usage

```bash
# Show directory listing on screen while saving to file
ls -l | tee directory_listing.txt

# Save command output while also grepping through it
dmesg | tee kernel_log.txt | grep "error"

# Save and display system information
uname -a | tee system_info.txt
```

### Multiple Destinations

```bash
# Write to multiple files at once
echo "Configuration data" | tee config1.txt config2.txt config3.txt

# Create log files in different directories simultaneously
journalctl | tee /var/log/custom.log ~/backup/system.log

# Save data and pipe to another command
cat data.csv | tee saved_data.csv | cut -d, -f1
```

### Appending Data

```bash
# Append new entries to an existing log
echo "$(date): Backup completed" | tee -a backup.log

# Add multiple entries to a log file
for i in {1..5}; do
  echo "Log entry $i" | tee -a running_log.txt
done

# Collect command outputs over time
cron_job1 | tee -a collection.log
cron_job2 | tee -a collection.log
```

### With sudo

```bash
# Edit system files while preserving permissions
cat new_config | sudo tee /etc/system_config > /dev/null

# Append to protected files
echo "new entry" | sudo tee -a /etc/hosts > /dev/null

# Update multiple system files at once
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf /etc/resolv.conf.bak
```

### In Scripts

```bash
# Log script operations while showing progress
echo "Starting backup..." | tee -a backup.log
rsync -av source/ destination/ | tee -a backup.log
echo "Backup complete" | tee -a backup.log

# Create a build log while monitoring in real-time
make 2>&1 | tee build.log
```

## ENVIRONMENT
No specific environment variables directly affect `tee` behavior, but standard I/O redirection settings apply.

## SEE ALSO
cat(1), script(1), dd(1), pipe(7), stdout(3)

## TIPS

1. **Discard stdout but keep the files**: Redirect stdout to `/dev/null`
   ```bash
   command | tee files.txt > /dev/null
   ```

2. **Write to files with elevated privileges**: Use `sudo tee` instead of redirection
   ```bash
   echo "content" | sudo tee /protected/file > /dev/null
   ```

3. **Capture both stdout and stderr**: Use process substitution
   ```bash
   command 2> >(tee stderr.log) > >(tee stdout.log)
   ```

4. **Timestamp your logs**: Combine with date command
   ```bash
   command | while read line; do echo "$(date): $line"; done | tee log.txt
   ```

5. **Use with command substitution**: To both capture and display output
   ```bash
   result=$(command | tee /dev/tty)
   ```

## COMMON ERRORS

| Error                                   | Solution                                       |
|-----------------------------------------|------------------------------------------------|
| Permission denied                       | Use `sudo tee` instead of direct redirection   |
| Only root seeing redirected output      | Check file permissions                         |
| Overwriting files accidentally          | Always use `-a` when appending is needed       |
| Not seeing output in terminal           | Make sure not redirecting stdout to /dev/null  |

## VERSION DIFFERENCES

- **GNU tee** (Linux): Includes options like `--output-error`.
- **BSD tee** (macOS, FreeBSD): May have fewer options than GNU version.
- **POSIX tee**: Only guarantees `-a` and `-i` options for portability.

Check your version with `tee --version` on GNU systems.
