import { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
import ReactFlow, { MarkerType } from 'react-flow-renderer'

const StoryLine = props => {
    const storyRef = useRef()
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState(false)

    useEffect(() => {
        renderNodes()
    }, [props.storyLine])

    useEffect(() => {
        const scrollContainer = storyRef.current.getElementsByClassName("react-flow__storyline")[0]

        if (!horizontalScrollEnabled && scrollContainer) {
            scrollContainer.addEventListener('wheel', e => handleHorizontalScroll(scrollContainer, e))
            setHorizontalScrollEnabled(true)
        }

        return () => {
            scrollContainer.removeEventListener('wheel', e => handleHorizontalScroll(scrollContainer, e))
        }
    }, [])

    const handleHorizontalScroll = (scrollContainer, e) => {
        e.preventDefault()
        scrollContainer.scrollLeft += e.deltaY
    }

    const renderNodes = () => {
        const nodes = []
        props.storyLine.forEach((label, i) => {
            const node = {
                id: `node-${i}`,
                connectable: false,
                data: { label },
                position: { x: i * 200 + 50, y: 25 },
                sourcePosition: 'right',
                targetPosition: 'left',
                type: i ? i !== props.storyLine.length - 1 ? '' : 'output' : 'input',
                style: { backgroundColor: '#fff', color: '#000' }
            }
            nodes.push(node)
        })
        setNodes(nodes)
    }

    const onNodesChange = () => {
        const edges = []
        for (let i = 0; i < nodes.length - 1; i++) {
            const edge = {
                id: `edge-${i}-${i + 1}`,
                source: `node-${i}`,
                target: `node-${i + 1}`,
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
                style: { stroke: '#72370A' }
            }
            edges.push(edge)
        }
        setEdges(edges)
    }

    const onExecute = () => {
        props.setStoryLine(nodes => [...nodes, 'new node'])
    }

    return (
        <div className="storyline" ref={storyRef}>
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
            <Button onClick={onExecute} className="button-solid__primary">Execute</Button>
        </div>
    )
}

export default StoryLine