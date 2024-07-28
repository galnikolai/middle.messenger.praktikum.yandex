export const template = `
<label for="{{name}}">{{label}}</label>
<input {{#if className}} class="{{className}}" {{/if}} name="{{name}}"  {{#if required}} required {{/if}}   {{#if placeholder}} placeholder="{{placeholder}}" {{/if}} >
    {{text}}
</input>
<span id="error-message" class="error"></span>
`
