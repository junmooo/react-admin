import React, { useEffect, useState } from "react";
import "./demo.less";
interface Iprops {}

const Demo2 = React.memo(function Demo(props: Iprops) {
  return <div className="container">Demo2</div>;
});

export default Demo2;
