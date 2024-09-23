export const template = `
<input {{#if id}} id={{id}} {{/if}}  {{#if className}} class="{{className}}" {{/if}} {{#if name}} name="{{name}}"  {{/if}} {{#if required}} required {{/if}}   {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}  {{#if value}} value="{{value}}" {{/if}}  {{#if acept}} acept="{{acept}}" {{/if}}  {{#if type}} type="{{type}}" {{/if}}>
    {{text}}
</input>
`
