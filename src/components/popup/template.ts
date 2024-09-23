export const template = `
<div class="popup">
 {{{ button }}}
 <div class="popup-container disabled {{ className }}" >
    <div class="popup-content">
     <div class="cross">x</div>
     {{{ content }}}
   </div>
 </div>
</div>
`
