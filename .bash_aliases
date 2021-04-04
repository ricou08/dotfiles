# Some common shortcuts for file-/directory commands
alias ls='ls --color=auto'
alias la='ls -ah'
alias ll='ls -lh'
alias lla='ls -lah'
alias l='ls'
alias ld='ls -l --color| grep ^d'
alias grep='grep --color=auto'
alias cd..='cd ..'

# Some common shortcuts for tools
alias j='jobs'
alias v='sudo vim'
alias taille='sudo du -h --max-depth=0'
alias tailles='sudo du -h --max-depth=1 | sort -hr'
alias syncserv='rsync -av -e "ssh -p 50024"'

# Aliases pour gestion des pacquets
alias install='sudo apt-get install'
alias upd='sudo apt-get update' # mise à jour des paquets officiels
alias upg='sudo apt-get upgrade'
alias remove='sudo apt-get purge'

# Aliases pour systemctl
alias senable='sudo systemctl enable'
alias sdisable='sudo systemctl disable'
alias sstart='sudo systemctl start'
alias sstop='sudo systemctl stop'
alias srestart='systemctl restart'
alias dotfiles='/usr/bin/git --git-dir=/home/eric/.dotfiles/ --work-tree=/home/eric'
