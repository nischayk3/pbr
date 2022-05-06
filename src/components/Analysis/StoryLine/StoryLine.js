const StoryLine = props => {
    return (
       <div>
           {props.storyLine.map(value => <span>{value}</span>)}
       </div>
    )
}

export default StoryLine