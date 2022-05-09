import { useState, useEffect } from 'react'
import { Button } from 'antd'
import ReactFlow, { MarkerType } from 'react-flow-renderer'

const StoryLine = props => {
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    useEffect(() => {
        initializeNodes()
    }, [props.storyLine])

    const initializeNodes = () => {
        const nodes = []
        props.storyLine.forEach((label, i) => {
            const node = {
                id: `node-${i}`,
                connectable: false,
                data: { label },
                position: { x: i * 200 + 50, y: 25 },
                sourcePosition: 'right',
                targetPosition: 'left',
                type: i ? '' : 'input',
                style: { backgroundColor: '#fff', color: '#000' }
            }
            nodes.push(node)
        })
        setNodes(nodes)
    }

    const onNodesChange = () => {
        for (let i = 0; i < nodes.length - 1; i++) {
            const edge = {
                id: `edge-${i}-${i + 1}`,
                source: `node-${i}`,
                target: `node-${i + 1}`,
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                style: { stroke: '#72370A' }
            }
            setEdges(edges => [...edges, edge])
        }
    }

    const addNode = () => {
        console.log('adding node')
        props.setStoryLine(nodes => [...nodes, 'new node'])
    }

    return (
        <div className="storyline">
            <ReactFlow
                panOnScroll={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                nodes={nodes}
                edges={edges}
                defaultMarkerColor="#72370A"
                onNodesChange={onNodesChange}
                className="react-flow__storyline"
            />
            <Button onClick={addNode} className="button-solid__primary">Add Node</Button>
        </div>
    )
}

export default StoryLine