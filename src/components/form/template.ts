export const template = `
<form  {{#if className}} class="{{className}}" {{/if}}  {{#if id}}  id="{{id}}"  {{/if}} >
   {{{fields}}}
</form>
`
