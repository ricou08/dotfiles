# Some common shortcuts for file-/directory commands
alias ls='ls -G'
alias la='ls -Ah'
alias ll='ls -lh'
alias lla='ls -lAh'
alias l='ls'
alias ld='ls -l --color| grep ^d'
alias lf='ll -p --color| grep -v /'
alias grep='grep --color'
alias cd..='cd ..'
 
# Some common shortcuts for tools
alias j='jobs'
alias v='sudo vim'
alias taille='sudo du -h --max-depth=0'
alias tailles='sudo du -h --max-depth=1 | sort -hr'
alias syncserv='rsync -av -e "ssh -p 50024"'
alias dotfiles='/usr/bin/git --git-dir=/Users/eric/.dotfiles/ --work-tree=/Users/eric'
