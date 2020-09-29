import React, { useState , useEffect, useRef } from "react";
import Nprogress from "nprogress";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";

import "react-placeholder/lib/reactPlaceholder.css";
import CircularProgress from "components/CircularProgress";

export default function asyncComponent(importComponent) {
  function AsyncFunc(props) {

   const [component, setComponent] = useState(null)
   const mounted = useRef(false)

    useEffect(() => {
      Nprogress.start();

      (async() => {
        mounted.current= true;
        const {default: Component} = await importComponent();
        Nprogress.done();
        if (mounted.current) {
          setComponent(<Component {...props} />)
        }
      })()
    
      // returned function will be called on component unmount 
      return () => {
        mounted.current = false;
      }
    }, [props])

      const Component = component || <CircularProgress/>;
      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
  }

  return AsyncFunc;
}
