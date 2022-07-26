import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { EditTask, Task } from "./TasksList";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import closeIcon from "../assets/icons/close/close.png";

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data: EditTask) => void;
}

export function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    const newTask: EditTask = {
      taskId: item.id,
      taskNewTitle: editTitle,
    };
    editTask(newTask);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editTitle}
            style={item.done ? styles.taskTextDone : styles.taskText}
            onChangeText={setEditTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.areaButtons}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 14 }}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleStartEditing}
              style={{ paddingHorizontal: 14 }}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          </>
        )}
        <View style={styles.dividerButtons}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 14, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  areaButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerButtons: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
