" Plugins will be downloaded under the specified directory.
call plug#begin('~/.vim/plugged')

" Declare the list of plugins.
Plug 'junegunn/goyo.vim'

" List ends here. Plugins become visible to Vim after this call.
call plug#end()


set hlsearch                                                                                                               
syntax enable
set number
highlight LineNr ctermfg=white ctermbg=darkgray
highlight CursorLineNr ctermfg=yellow ctermbg=darkgray
hi CursorLine   cterm=NONE ctermbg=darkgray ctermfg=none

set tabstop=4       " The width of a TAB is set to 4.
                    " Still it is a \t. It is just that
                    " Vim will interpret it to be having
                    " a width of 4.

set shiftwidth=4    " Indents will have a width of 4
set noexpandtab   " Always uses tabs instead of space characters (noet).
set autoindent    " Copy indent from current line when starting a new line (ai).
