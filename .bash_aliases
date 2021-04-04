# Some common shortcuts for file-/directory commands
alias ls='ls --color=auto'
alias la='ls -ah'
alias ll='ls -lh'
alias lla='ls -lah'
alias l='ls'
alias ld='ls -l --color| grep ^d'
alias lf='ll -p --color| grep -v /'
alias grep='grep --color=auto'
alias cd..='cd ..'

 
# Some common shortcuts for tools
alias j='jobs'
alias v='sudo vim'
alias taille='sudo du -h --max-depth=0'
alias tailles='sudo du -h --max-depth=1 | sort -hr'
alias syncserv='rsync -av -e "ssh -p 50024"'
alias rmv='rsync -aP --remove-source-files'
alias df='df  -h'

# Aliases pour gestion des pacquets
alias install='sudo apt install'
alias upd='sudo apt update' # mise à jour des paquets officiels
alias upg='sudo apt upgrade'
alias remove='sudo apt purge'

# Aliases pour systemctl
alias senable='sudo systemctl enable'
alias sdisable='sudo systemctl disable'
alias sstart='sudo systemctl start'
alias sstop='sudo systemctl stop'
alias srestart='systemctl restart'
alias sstatus='systemctl status'

# Aliases pour log openhab
alias openhabLog='tail -f /home/eric/docker/openhab/data/userdata/logs/openhab.log'
alias openhabEvents='tail -f /home/eric/docker/openhab/data/userdata/logs/events.log'

# Aliases pour pour les commandes git des dotfiles
alias dotfiles='/usr/bin/git --git-dir=/home/eric/.dotfiles/ --work-tree=/home/eric'
alias dotf='dotfiles'
alias dotfs='dotf status'
alias dotfa='dotf add -u'
alias dotfc='dotf  commit -m'
alias dotfp='dotf push origin serveur'

# colorisation de cat en fonction du language -> plugin zsh
alias cat='ccat'
