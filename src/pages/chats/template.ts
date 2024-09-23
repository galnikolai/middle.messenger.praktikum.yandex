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
           Select any chat
        </div>
        <div class="chat-header">
          <span class="chat-title">Name</span>
          <div class="button-block">{{{ editUsers }}} {{{ addUsers }}}</div>
        </div>
        <div class="chat-messages">
          <div class="message received">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus similique, aperiam
              rem adipisci non provident laudantium exercitationem quia labore ipsum fugit itaque
              eos placeat architecto consequuntur! Magni molestias neque facilis doloremque a
              distinctio veritatis aperiam officia, commodi veniam quae magnam odit doloribus sed?
              Quasi facere ipsam debitis odit aliquid libero voluptatem enim saepe aperiam, et
              nesciunt, dolores veniam porro recusandae delectus! Recusandae dolore asperiores
              deserunt animi nostrum consectetur saepe provident temporibus. Dignissimos ipsa
              asperiores at commodi nisi ea minus adipisci quae illo, amet rerum alias fugiat beatae
              ullam odit natus ipsam exercitationem ad tempora eos quaerat? Id, deleniti enim quod
              beatae unde quis similique qui praesentium quos reiciendis incidunt laboriosam dicta
              quidem minima! Culpa at exercitationem dolorum, repellat ipsam magni maxime, laborum
              aliquid soluta quibusdam officia amet similique veniam optio nobis eveniet dolore
              quam, debitis deserunt fugit enim doloribus. Earum, officia unde autem molestias non,
              animi blanditiis perferendis sit quod expedita iusto sint itaque! Adipisci soluta
              rerum sequi cupiditate, eligendi cumque ex, eaque recusandae quasi sunt distinctio
              alias deleniti delectus quidem voluptatem veritatis voluptatibus dolorum dicta,
              repellendus magni. Ipsa, adipisci cum? Ea, amet itaque laborum excepturi possimus ab
              perspiciatis rerum iure eligendi deleniti fuga inventore at ad esse. Similique, enim!
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque beatae voluptate
              assumenda eius natus autem sequi quam tenetur provident! Fugit placeat nulla illum
              expedita doloribus totam blanditiis tempore adipisci ea.
            </p>
          </div>
          <div class="message sent">
            <p>blanditiis tempore adipisci ea!</p>
          </div>
        </div>
        <div class="chat-input">
        {{{ messageInput }}}
        {{{ sendButton }}}
        </div>
      </div>
      </div>

`
