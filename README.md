Emarsys UI AngularJS components
===============================

The ```boar-ng-common``` library is a collection of reusable AngularJS UI components for the [Emarsys Boar stack](https://github.com/emartech/?query=boar-) and [Emarsys UI Framework](https://ui.static.emarsys.net).

## Installation

You must have installed the [angular-translate](https://github.com/angular-translate/angular-translate) library.

Install ```boar-ng-common``` to your application:

```bash
npm install boar-ng-common --save
```

In your application load the library after loading ```angular```:

```javascript
require('boar-ng-common');
``` 

## The Pager component

It is a paginator component.

```javascript
this.pager = {
  page: 0,
  limit: 10,
  total: 78
}
```

```html
<e-pager page="ctrl.pager.page" page-size="ctrl.pager.limit" total="ctrl.pager.total"></e-pager>
```

## The Steps component

It implements the Emarsys UI Framework's *Steps* component.

```javascript
this.steps = {
  step: 1,
  steps: [
    { value: 'Description' },
    { value: 'Contenu du formulaire', disabled: true },
    { value: 'Destinataires' },
    { value: 'Champs de données' },
    { value: 'Après inscription' },
    { value: 'Code source' },
  ]  
}
```

```html
<e-steps steps="ctrl.steps.steps" step="ctrl.steps.step"></e-steps>
```

## The Table component

It implements the Emarsys UI Framework's *Table* component, with a search field, sorting, paging and action buttons for the table and the table rows.

```javascript
this.characters = [
  { id: 1, name: "Daenerys Targaryen", gender: "female" },
  { id: 2, name: "Joffrey Baratheon", gender: "male" },
  { id: 3, name: "Tyrion Lannister", gender: "male" },
  { id: 4, name: "Sansa Stark", gender: "female" },
  { id: 5, name: "Eddard Stark", gender: "male" }
]
```

```html
<e-table model="ctrl.characters" default-sort-field="id" default-sort-order="asc" show-search>
  <e-table-button href="#/characters/new">Add a New Character</e-table-button>

  <e-table-cell title="ID" sort-field="id">{{ row.id }}</e-table-cell>
  <e-table-cell title="Character Name" sort-field="name">{{ row.name }}</e-table-cell>
  <e-table-cell title="Gender" sort-field="gender">{{ row.gender | uppercase }}</e-table-cell>

  <e-table-action tooltip="Edit" icon="#pencil" href="#/characters/{{ row.id }}"></e-table-action>
  <e-table-action tooltip="Delete" icon="#trash-o" action="ctrl.killCharacter(row.id)"></e-table-action>

  <e-table-pager></e-table-pager>
</e-table>
```

The search field and the pager can be removed.
