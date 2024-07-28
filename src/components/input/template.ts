export const template = `
<input  {{#if className}} class="{{className}}" {{/if}}  name="{{name}}" {{#if required}} required {{/if}}  {{#if placeholder}} placeholder="{{placeholder}}" {{/if}} >
    {{text}}
</input>
`
