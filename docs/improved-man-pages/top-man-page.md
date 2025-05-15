# TOP(1) Enhanced Manual Page

## NAME
**top** - display and update sorted information about processes

## QUICK START
```bash
# Launch top with default settings
top

# Refresh every 2 seconds instead of default
top -d 2

# Display only processes of specific user
top -u username

# Show processes sorted by memory usage
top -o %MEM
```

## VISUAL SYNTAX
```
top [OPTIONS]
 │      │
 │      └─ Options controlling display, refresh rate, sorting, etc.
 └─ The top command itself
```

## DESCRIPTION
`top` provides a dynamic real-time view of a running system. It displays system summary information and a list of processes or threads currently managed by the Linux kernel. The display is updated regularly and can be configured to highlight certain metrics, sort by various fields, and filter process lists.

`top` is particularly useful for system monitoring, troubleshooting performance issues, identifying resource-intensive processes, and observing system behavior under load.

## COMMONLY USED OPTIONS

### Display Options

| Short | Long             | Description                                      | Example                  |
|-------|------------------|--------------------------------------------------|--------------------------|
| `-d N`| `--delay=N`      | Update every N seconds (default: 3.0)            | `top -d 1`               |
| `-b`  | `--batch`        | Run in batch mode (useful for scripts)           | `top -b -n 1`            |
| `-n N`| `--iterations=N` | Exit after N iterations                          | `top -n 5`               |
| `-H`  | `--threads`      | Show individual threads                          | `top -H`                 |

### Process Selection Options

| Short | Long             | Description                                      | Example                  |
|-------|------------------|--------------------------------------------------|--------------------------|
| `-p N`| `--pid=N,...`    | Monitor only the specified process IDs           | `top -p 1234,5678`       |
| `-u U`| `--user=U,...`   | Monitor only processes of specified users        | `top -u root,www-data`   |
| `-U U`| `--User=U,...`   | Monitor only processes with specified effective user ID | `top -U 1000`      |

### Output Options

| Short | Long             | Description                                      | Example                  |
|-------|------------------|--------------------------------------------------|--------------------------|
| `-o F`| `--sort=F`       | Sort processes by field F (e.g., %CPU, %MEM)     | `top -o %MEM`            |
| `-O F`| `--format=F`     | Add field F to display format                    | `top -O COMMAND`         |
| `-w N`| `--width=N`      | Set output width (screen columns)                | `top -w 120`             |

## INTERACTIVE COMMANDS

Once `top` is running, you can control it with these keyboard commands:

### Display Controls

| Key(s) | Description                                          |
|--------|------------------------------------------------------|
| `h` or `?` | Help screen                                      |
| `q`    | Quit top                                             |
| `k`    | Kill a process (prompts for PID and signal)          |
| `r`    | Renice a process (change priority)                   |
| `d` or `s` | Change update interval                           |
| `W`    | Write current setup to ~/.toprc                      |

### Display Format

| Key(s) | Description                                          |
|--------|------------------------------------------------------|
| `f`    | Add/remove fields to display                         |
| `o`    | Change sort field                                    |
| `F`    | Select sort field                                    |
| `<`    | Move sort field left                                 |
| `>`    | Move sort field right                                |

### Display Toggles

| Key(s) | Description                                          |
|--------|------------------------------------------------------|
| `t`    | Toggle task/CPU stats                                |
| `m`    | Toggle memory information                            |
| `1`    | Toggle single/all CPU display                        |
| `b`    | Toggle bold for running tasks                        |
| `c`    | Toggle command name/line                             |
| `V`    | Toggle forest view (show process hierarchy)          |
| `i`    | Toggle idle processes                                |

## DISPLAY FIELDS

| Field     | Description                                          |
|-----------|------------------------------------------------------|
| `PID`     | Process ID                                           |
| `USER`    | User name                                            |
| `PR`      | Priority                                             |
| `NI`      | Nice value (-20 to 19, lower is higher priority)     |
| `VIRT`    | Total virtual memory used                            |
| `RES`     | Resident set size (non-swapped physical memory)      |
| `SHR`     | Shared memory size                                   |
| `S`       | Process status (D=uninterruptible sleep, R=running, S=sleeping, T=stopped, Z=zombie) |
| `%CPU`    | CPU usage percentage                                 |
| `%MEM`    | Memory usage percentage                              |
| `TIME+`   | CPU time, hundredths of a second                     |
| `COMMAND` | Command name/line                                    |

## PRACTICAL EXAMPLES

### Basic Monitoring

```bash
# Basic monitoring with faster updates (1 second)
top -d 1

# Run for 10 iterations then exit (useful for scripts)
top -b -n 10 > top_output.txt

# Show output in batch mode once (for scripts/logs)
top -b -n 1 | grep "Cpu"
```

### Filtering Processes

```bash
# Monitor only processes of a specific user
top -u apache

# Watch specific processes by PID
top -p 1234,5678

# Show only processes consuming CPU
top -i
```

### Custom Sorting

```bash
# Sort by memory usage instead of CPU
top -o %MEM

# Sort by process state
top -o S

# Sort by elapsed CPU time
top -o TIME
```

### Advanced Usage

```bash
# Show individual threads for better diagnostics
top -H

# Monitor and highlight high-priority processes
top -b -n 1 | grep " RT"

# Full command paths instead of just executable names
top -c

# Custom column display
top -d 2 -o %MEM -O TIME+,PPID
```

### For System Analysis

```bash
# Watch for memory leaks (sort by RES)
top -o RES

# Monitor I/O-intensive processes
top -o VIRT

# Watch CPU usage with per-CPU details
top -d 1
# Then press '1' to toggle per-CPU view
```

## ENVIRONMENT

| Variable           | Description                                      |
|--------------------|--------------------------------------------------|
| `COLUMNS`          | Override detected terminal width                 |
| `LINES`            | Override detected terminal height                |
| `HOME`             | Location of .toprc configuration                 |
| `LC_ALL`           | Locale setting for all categories                |
| `TERM`             | Terminal type for color support                  |

## SEE ALSO
ps(1), free(1), htop(1), vmstat(1), kill(1), nice(1), atop(1), glances(1), uptime(1)

## TIPS

1. **Save your configuration** with `W` while running top to create a `.toprc` file.

2. **Toggle between different views** with the `t`, `m`, and `1` keys to see different system information.

3. **Use batch mode for scripting**:
   ```bash
   # Collect system stats every 5 minutes
   while true; do top -b -n 1 >> system_stats.log; sleep 300; done
   ```

4. **Consider `htop` as an alternative** for a more user-friendly, colorful interface with built-in filtering and sorting.

5. **For memory analysis**, toggle through memory views with the `m` key to see different memory metrics.

6. **Understand the difference** between VIRT (allocated), RES (used physical), and SHR (shareable) memory.

7. **Use the `c` key** to toggle between showing just the command name and the full command line with arguments.

## COMMON ERRORS

| Issue                                     | Solution                                    |
|-------------------------------------------|---------------------------------------------|
| Top refreshes too quickly/slowly          | Change interval with `-d` or press `s`      |
| Too many processes to see relevant ones   | Use filtering (`-p`, `-u`) or press `o` to change sort |
| Process names truncated                   | Press `c` to toggle between command name/line |
| Can't kill process from top               | Ensure you're running with sufficient privileges |
| Display too wide/narrow for terminal      | Adjust with `-w` or resize terminal         |

## VERSION DIFFERENCES

- **procps-ng top** (most Linux): Feature-rich with many interactive commands.
- **BSD top** (macOS, FreeBSD): Different interface and command options.
- **Solaris top**: More limited feature set compared to Linux version.

Different distributions may have slightly different versions with varying features. Check your specific version with `top -v`.

**Note:** Some distros ship with enhanced alternatives like `htop`, `atop`, or `glances` which provide more features and better visualization.
