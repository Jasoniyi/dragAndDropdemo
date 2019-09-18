import React, { Component } from "react";
import initialData from "./initial-data";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    console.log(result);
    //TODO reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    // if the location of the draggable changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //reorda taskid array for the column
    const column = this.state.columns[source.droppableId];
    // create new taskId array
    const newTaskIds = Array.from(column.taskIds);
    //move taskId from old index to new index
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    // create new column with thee newTaskIds
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    // put newColumn into a newStete
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
