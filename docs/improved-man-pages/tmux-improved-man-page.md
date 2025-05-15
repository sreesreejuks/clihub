# TMUX(1) Enhanced Manual Page

## NAME
**tmux** - terminal multiplexer: manage multiple terminal sessions in a single window

## QUICK START
```bash
# Start a new tmux session
tmux

# Create a named session
tmux new -s mysession

# Attach to an existing session
tmux attach -t mysession

# List running sessions
tmux ls

# Split the current pane horizontally
# (Within tmux, press Ctrl-b then ")
tmux split-window

# Split the current pane vertically
# (Within tmux, press Ctrl-b then %)
tmux split-window -h
```

## VISUAL SYNTAX
```
tmux [OPTIONS] COMMAND [ARGUMENTS]
 │       │       │         │
 │       │       │         └─ Arguments for the specific command
 │       │       └─ Command to execute (new, attach, list-sessions, etc.)
 │       └─ General tmux options
 └─ The tmux command itself
```

## DESCRIPTION
`tmux` is a terminal multiplexer that enables a number of terminals to be created, accessed, and controlled from a single screen. It may be detached from a screen and continue running in the background, then later reattached.

`tmux` is designed to be a modern, BSD-licensed alternative to programs such as GNU Screen. Key features include:
- Creating multiple terminal sessions within a single window
- Detaching sessions and reattaching them later
- Splitting windows into panes
- Switching between multiple sessions
- Customizing layouts and key bindings
- Scriptable control with command-line syntax

## COMMONLY USED OPTIONS

### General Options

| Option           | Description                                   | Example                         |
|------------------|-----------------------------------------------|----------------------------------|
| `-f FILE`        | Use alternative configuration file            | `tmux -f ~/.tmux-alt.conf`       |
| `-L SOCKET`      | Use alternative socket name                   | `tmux -L mysocket`               |
| `-S SOCKET_PATH` | Use alternative socket path                   | `tmux -S /tmp/custom-socket`     |
| `-v`             | Verbose logging                               | `tmux -v`                        |
| `-V`             | Display version                               | `tmux -V`                        |

### Commands

| Command          | Description                                   | Example                         |
|------------------|-----------------------------------------------|----------------------------------|
| `new-session`    | Create a new session                          | `tmux new-session -s mysession` |
| `attach-session` | Attach to an existing session                 | `tmux attach -t mysession`      |
| `list-sessions`  | List all sessions                             | `tmux list-sessions`            |
| `kill-session`   | Destroy a session                             | `tmux kill-session -t mysession`|
| `split-window`   | Split the current pane                        | `tmux split-window -h`          |
| `select-pane`    | Select a specific pane                        | `tmux select-pane -t 2`         |
| `send-keys`      | Send keystrokes to a window                   | `tmux send-keys "ls" C-m`       |

## KEY BINDINGS

All tmux commands are prefixed with a key combination, by default `Ctrl-b` (displayed as `C-b`).

### Session Management

| Key           | Action                                         |
|---------------|------------------------------------------------|
| `C-b d`       | Detach from current session                    |
| `C-b $`       | Rename current session                         |
| `C-b s`       | Show all sessions                              |
| `C-b )`       | Switch to next session                         |
| `C-b (`       | Switch to previous session                     |

### Window Management

| Key           | Action                                         |
|---------------|------------------------------------------------|
| `C-b c`       | Create new window                              |
| `C-b ,`       | Rename current window                          |
| `C-b n`       | Move to next window                            |
| `C-b p`       | Move to previous window                        |
| `C-b 0-9`     | Select window by number                        |
| `C-b w`       | List all windows                               |
| `C-b &`       | Kill current window                            |

### Pane Management

| Key           | Action                                         |
|---------------|------------------------------------------------|
| `C-b %`       | Split pane vertically                          |
| `C-b "`       | Split pane horizontally                        |
| `C-b o`       | Switch to next pane                            |
| `C-b ;`       | Switch to previously used pane                 |
| `C-b {`       | Move current pane left                         |
| `C-b }`       | Move current pane right                        |
| `C-b Space`   | Cycle through pane layouts                     |
| `C-b x`       | Close current pane                             |
| `C-b z`       | Toggle pane zoom (maximize/restore)            |
| `C-b Arrow`   | Switch to pane in direction of arrow           |

### Copy Mode

| Key           | Action                                         |
|---------------|------------------------------------------------|
| `C-b [`       | Enter copy mode                                |
| `C-b ]`       | Paste from buffer                              |
| `Space`       | Start selection (in copy mode)                 |
| `Enter`       | Copy selection (in copy mode)                  |
| `q`           | Exit copy mode                                 |

## CONFIGURATION

Tmux uses the configuration file `~/.tmux.conf` by default. Common configuration options include:

```bash
# Change prefix key to C-a
unbind C-b
set -g prefix C-a

# Enable mouse support
set -g mouse on

# Set window numbering to start at 1
set -g base-index 1

# Set pane numbering to start at 1
setw -g pane-base-index 1

# Customize status bar
set -g status-bg black
set -g status-fg white
```

## PRACTICAL EXAMPLES

### Session Management

```bash
# Create a new named session
tmux new -s project

# Create a new session in detached state
tmux new -s background -d

# Attach to an existing session
tmux attach -t project

# Create a new session if it doesn't exist, otherwise attach
tmux new-session -A -s project

# Kill a specific session
tmux kill-session -t project

# List all active sessions
tmux ls
```

### Window and Pane Control

```bash
# Create session with specific window layout
tmux new -s dev -n editor \; \
  split-window -v -p 30 \; \
  split-window -h -p 66 \; \
  split-window -h -p 50

# Send commands to a specific window
tmux send-keys -t mysession:0 "vim" C-m

# Resize a pane
tmux resize-pane -D 10  # Resize down by 10 cells

# Create a new window with a specific name
tmux new-window -n "logs" "tail -f /var/log/syslog"

# Synchronize input to all panes in a window (for running same command on multiple servers)
tmux set-window-option synchronize-panes on
```

### Advanced Usage

```bash
# Run command in a new detached session
tmux new -d "long-running-command; bash"

# Capture pane content to a file
tmux capture-pane -p > output.txt

# Run a command in all panes
tmux set-window-option synchronize-panes on
# (type command in any pane)
tmux set-window-option synchronize-panes off

# Monitor activity in a window
tmux set-window-option -g monitor-activity on

# Create a new session with specific layout and commands
tmux new-session -d -s dev \; \
  send-keys 'vim' C-m \; \
  split-window -v -p 30 \; \
  send-keys 'npm start' C-m \; \
  select-pane -t 0
```

### Pair Programming and Collaboration

```bash
# Create a shared session (both users need access to the same system)
tmux -S /tmp/shared new -s pair
chmod 777 /tmp/shared

# Second user can then join with:
tmux -S /tmp/shared attach -t pair

# Share readonly session
tmux new -s readonly
# Other user attaches with:
tmux attach -t readonly -r
```

## ENVIRONMENT

| Variable           | Description                                      |
|--------------------|--------------------------------------------------|
| `TMUX`             | Set when inside a tmux session (socket,pid,session) |
| `TMUX_PANE`        | ID of current pane                              |
| `TERM`             | Terminal type within tmux (`screen` or `tmux`)  |

## SEE ALSO
screen(1), byobu(1), terminator(1), splitvt(1)

## TIPS

1. **Create a cheatsheet** of the key bindings you use most often - there are too many to memorize at first.

2. **Customize your prefix key** - Many users change the default `C-b` to `C-a` for easier reach.

3. **Create a tmux config file** - A good `~/.tmux.conf` file can significantly improve your experience.

4. **Use named sessions** for different projects or contexts to stay organized.

5. **Use session groups** (sessions with names sharing a prefix, like "work:project1", "work:project2") for related work.

6. **Learn tmux scripting** for repetitive session setups:
   ```bash
   # Save to a file like dev-setup.sh and run it to create your workspace
   #!/bin/bash
   tmux new-session -d -s development
   tmux rename-window -t development:0 'editor'
   tmux send-keys -t development 'vim' C-m
   tmux split-window -h
   tmux send-keys 'npm start' C-m
   tmux new-window -t development:1 -n 'server'
   tmux send-keys -t development:1 'ssh myserver' C-m
   tmux attach -t development
   ```

7. **Use copy mode** (`C-b [`) for scrolling through output history.

8. **Install plugins** with [TPM (Tmux Plugin Manager)](https://github.com/tmux-plugins/tpm) to extend functionality.

## COMMON ERRORS

| Error/Issue                                | Solution                                 |
|--------------------------------------------|-----------------------------------------|
| "no server running on..."                  | No tmux sessions exist, create a new one |
| "session not found"                        | Verify session name with `tmux ls`      |
| Can't scroll in tmux                       | Enter copy mode with `C-b [`            |
| Colors look wrong                          | Set `TERM=screen-256color` or `tmux-256color` |
| Vim/Emacs key bindings conflict with tmux  | Remap conflicting keys in your configuration |
| Mouse mode not working                     | Add `set -g mouse on` to your config    |

## VERSION DIFFERENCES

- **tmux < 2.1**: Mouse support uses `mode-mouse on` and separate options
- **tmux 2.1+**: Mouse support unified to `mouse on`
- **tmux < 1.9**: Window creation syntax differs
- **tmux 3.0+**: Status line styling uses different syntax

Check your version with `tmux -V` and consult the appropriate documentation for your version.

**Note:** Many online tutorials may reference outdated syntax or key bindings. Always check your tmux version and adjust accordingly.
