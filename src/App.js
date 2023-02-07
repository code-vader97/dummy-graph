import Graph from "./Graph";
import React, { useState, useCallback, useEffect } from "react";
import {getNodes, getEdges} from './helper/helper';
import "./App.css";
import axios from "axios";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  physics: {
    // https://visjs.github.io/vis-network/docs/network/physics.html
    stabilization: {
      enabled: true // disables animation.
    },
    solver: "forceAtlas2Based"
  },
  interaction: {
    hover: true // for changing cursor over node
  }
};

function App() {
  const [data, setData] = useState({nodes: [], edges: []});
  const [network, setNetwork] = useState();

  const clusterOptions = {
    processProperties: (clusterOptions, childNodes) => {
      clusterOptions.label = "[" + childNodes.length + "]";
      return clusterOptions;
    },
    clusterNodeProperties: {
      borderWidth: 10,
      shape: "box",
      color: "red",
      size: 25,
      font: { size: 20, color: "white" }
    }
  };

  useEffect(()=>{
    if(!data["nodes"].length && !data["edges"].length) {
      let url = "http://localhost:8000/data";
      axios.get(url).then((response) => {
        // write custom parser here
        let nodes = getNodes(response.data.nodes);
        let edges = getEdges(response.data.links);
        setData((prevData)=>{
          const newData = {"nodes": nodes, "edges": edges};
          return newData;
        });
      });
      
    }
  }, [data])


  const events = {
    hoverNode: (params) => {
      if (network) network.canvas.body.container.style.cursor = "pointer";
    },
    blurNode: (params) => {
      if (network) network.canvas.body.container.style.cursor = "default";
    },
    selectNode: (params) => {
      const nodeId = params.nodes[0];

      if (network.isCluster(nodeId)) {
        network.openCluster(nodeId);
      } else {
        const nodeChilds = data.edges.filter((edge) => edge.from === nodeId);

        if (nodeChilds.length) {
          network.clusterByConnection(nodeId, clusterOptions);
        }
      }
    }
  };

  const getNetwork = useCallback((network) => {
    setNetwork(network);
  }, []);

  return (
    <div className="App">
      {data["nodes"].length && data["edges"].length && <Graph
        data={data}
        options={options}
        events={events}
        style={{ height: "350px" }}
        getNetwork={getNetwork}
      />}
      
    </div>
  );
}

export default App;
