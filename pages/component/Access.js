import { Children, cloneElement, isValidElement } from "react";

export default function Access({ children }) {
  const check = (role) => (role === "Reviewer"|| role==="Super" ? true : false);
    
  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (isValidElement(child)) {
      return cloneElement(child, { check });
    }
    return child;
  });
  return <>{childrenWithProps}</>;
}
