export function getNodes(nodeData) {
    const nodes = nodeData.map((node) => {
        return node.isText
          ? {
              ...node,
              shape: "box",
              color: {
                background: "darkblue",
                hover: { background: "black" },
                highlight: { background: "red" }
              },
              font: { size: 20, color: "white", multi: true },
              widthConstraint: { maximum: 170 },
              margin: 20,
              labelHighlightBold: false,
              borderWidth: 0
            }
          : {
              id: node.id,
              shape: node.svg
                ? node.id === "Marvel"
                  ? "image"
                  : "circularImage"
                : "dot",
              label: node.id,
              image: node.svg,
              size: node.size / 15,
              color: node.svg ? "#d3d3d3" : "red",
              font: { size: 14, color: "black" },
              borderWidth: 0
            };
      
    });
    return nodes;
}

export function getEdges(edgesData) {
    const changeChosenEdge = (values, id, selected, hovering) => {
        values.width = 5;
        values.color = "red";
      };
    const edges = edgesData.map((link) => ({
        from: link.source,
        to: link.target,
        arrows: "to",
        color: "lightgray",
        width: 4,
        chosen: { edge: changeChosenEdge }
      }));
      return edges;
}