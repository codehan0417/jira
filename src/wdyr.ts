
import React from 'react';
 
if (process.env.WHY_RENDER) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
