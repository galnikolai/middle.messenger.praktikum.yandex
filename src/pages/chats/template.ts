export const template = `
    <div class="chat-container">
      <div class="sidebar">
      <div class="button-block">
      {{{ createChat }}}
      {{{ profileLink }}}
      </div>
        <div class="search-bar">
          {{{ searchInput }}}
        </div>
        <div class="chat-list">

        </div>
      </div>
      <div class="chat-content">
        <div class="chat-placeholder">
           Select unknown chat
        </div>
        <div class="chat-header">
          <span class="chat-title">Name</span>
          <div class="button-block">{{{ editUsers }}} {{{ addUsers }}}   {{{ deleteChat }}}</div>
        </div>
        <div class="chat-messages">
         
        </div>
        <div class="chat-input">
        {{{ messageInput }}}
        {{{ sendButton }}}
        </div>
      </div>
      </div>

`
