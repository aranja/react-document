# React Document

This component provides a React Component to render
a HTML Document with common functionality. It can be
integrated into webpack static builds as well as SSR.

React Document aims to provide a static interface for
other libraries to generate dom.

## Install

```sh
npm install --save react-document
```

## Props

### \<Document />

#### Props

##### - htmlProps?: { [key: string]: string }

Optional. React props for the html element.

##### - bodyProps?: { [key: string]: string }

Optional. React props for the body element.

##### - app?: string

Optional. A string to dangerously set inside the app mount element.
Usually a rendered React app.

##### - appMountId?: string

Optional. The id of the app mount element. Defaults to 'app'.

##### - title?: string

Optional. Title of the document, rendered in a \<title> tag.

##### - viewport?: string

Optional. Configuration for the viewport meta tag. Defaults to a mobile
friendly `width=device-width, initial-scale=1`.

##### - head?: ReactElement[]
 
Optional. Array of React elements to render inside the \<head> tag.

##### - footer?: ReactElement[]

Optional. Array of React elements to render in the footer, after the
content of the page.

##### - css?: string[]

Optional. Array of urls to load with script tags. These are placed in
the \<head> with the [defer attribute](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-defer).
This allows the browser to start preloading the script but delay
execution until the DOM is ready.

##### - js?: string[]

Optional. Array of urls to load with stylesheet link tags in the head.

##### - window?: { [key: string]: any }

Optional. Object who's own properties are [safely serialized](https://www.npmjs.com/package/serialize-javascript)
to JSON and attached to the browser's `window` object in corresponding keys.

## Extending Document

Inspired by [Next.js](https://github.com/zeit/next.js), it's easy to customize
the Document without breaking other integrations:

```javascript
import Document, { Html, Head, Body, App, Footer } from 'react-document'

export class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Roboto */}
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        </Head>
        <Body>
          <App />
          <Footer />
          {/* Pixel */} 
          <img height="1" width="1" style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=...&amp;ev=PageView&amp;noscript=1"
          />
        </Body>
      </Html>
    )
  }
}
```

## Usage in SSR

```javascript
import Document from 'react-document'
import { renderToStaticMarkup, renderToString } from 'react/server'

// ... in rendering context:
const app = renderToString(<App />)
const document = '<!doctype html>' + renderToStaticMarkup(
  <Document
    title="Hello World"
    app={app}
    appMountId="root"
  />
)
```

## Usage with webpack-dev-server

Check out [jsx-document-webpack-plugin](https://github.com/aranja/jsx-html-webpack-plugin).
