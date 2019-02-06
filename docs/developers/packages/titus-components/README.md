# Titus Components
The [titus-components](https://www.npmjs.com/package/@nearform/titus-components) package includes reusable components built on top of existing components provided by open source libraries, enhanced an customized to make them more easily reusable and include additional features.

A demo of the components hosted on CodeSandbox is available [here](https://codesandbox.io/s/23njk88x0p).

## Autocomplete
The Autocomplete component provides typical autocompletion features using [Material UI] and [downshift].

It supports synchronous and asynchronous loading of list items.

Go [Here](/components/autocomplete)

## Navigation
The Navigation component provides a typical page layout with a header, a left side drawer and a main content area, all built on top of [Material UI] lower-level components.

## Table
The Table component provides an easy to use table built on top of the [@nearform/react-table] component, along with the [Material UI] Table component.

## Uploader
The Uploader component provides and easy to use way to upload files to a backend by pulling together the [react-dnd] library and [Material UI] components.

## Wizard
The Wizard component provides an easy way to create multi-step wizard user interfaces by abstracting away the [Material UI]'s [Stepper] component and introducing way to collect data from the wizard’s steps, marking steps as required, and summarizing the collected data in a final step.