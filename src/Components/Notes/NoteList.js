import React, { useEffect, useState } from "react";
import todoStyles from "./Note.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import NoteServices from "../../Services/NoteServices";
import EditNote from "./EditNote";
import CloneNote from "./CloneNote";
import DeleteNote from "./DeleteNote";
import Pagination from "../Pagination/Pagination";

export const NoteList = ({ name }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEntries] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [editNote, setEditNote] = useState(null);
  const [editText, setEditText] = useState("");

  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NoteServices.getAllNotes(
          currentPage,
          name,
          totalEntries,
          searchText
        );
        setTasks(response.data);
        setTotalPages(response.data.totalPages);
        setTotalData(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, name, searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks?.data?.filter((task) =>
    task.user.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUpdate = async (id, data) => {
    try {
      const response = await NoteServices.IsEditNotes(id, data);
      setEditNote(null);
      setEditText("");
      window.location.reload();
    } catch (error) {
      console.error("Update Request Error:", error);
    }
  };

  return (
    <div className={todoStyles.todoList}>
      <div className={todoStyles.taskListHeading}>
        <input
          type="text"
          placeholder="Search Your Note"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className={todoStyles.totalList}>
        <table>
          <tbody>
            {filteredTasks?.map((task) => (
              <tr
                key={task._id}
                className={task.done ? todoStyles.doneTask : ""}
              >
                <td>
                  <RxHamburgerMenu />
                </td>

                <td>
                  <div className={todoStyles.todoListText}>
                    {editNote === task._id ? (
                      <>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <EditNote task={task} handleUpdate={handleUpdate} />
                      </>
                    ) : (
                      <>
                        <p>{task.user}</p>
                        <div className={todoStyles.icons}>
                          <EditNote task={task} handleUpdate={handleUpdate} />
                          <CloneNote task={task} />
                          <DeleteNote task={task} />
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={totalData}
      />
    </div>
  );
};
