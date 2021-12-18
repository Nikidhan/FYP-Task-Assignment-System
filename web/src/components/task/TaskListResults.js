import "./TaskListResults.css"
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  // Checkbox,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Modal,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';
// import getInitials from '../../utils/getInitials';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TaskListResults = ({ tasks, ...rest }) => {
  // const [selectedtaskIds, setSelectedtaskIds] = useState([]);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [selectedtaskIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openTask, setOpenTask] = useState(false);

  // const handleSelectAll = (event) => {
  //   let newSelectedtaskIds;

  //   if (event.target.checked) {
  //     newSelectedtaskIds = tasks.map((task) => task.id);
  //   } else {
  //     newSelectedtaskIds = [];
  //   }

  //   setSelectedtaskIds(newSelectedtaskIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedtaskIds.indexOf(id);
  //   let newSelectedtaskIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedtaskIds = newSelectedtaskIds.concat(selectedtaskIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedtaskIds = newSelectedtaskIds.concat(selectedtaskIds.slice(1));
  //   } else if (selectedIndex === selectedtaskIds.length - 1) {
  //     newSelectedtaskIds = newSelectedtaskIds.concat(selectedtaskIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedtaskIds = newSelectedtaskIds.concat(
  //       selectedtaskIds.slice(0, selectedIndex),
  //       selectedtaskIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedtaskIds(newSelectedtaskIds);
  // };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
  <div>
    <Modal
        open={openTask}
        onClose={() => setOpenTask(false)}
        aria-labelledby="simple-modal-title"
      >
      <div style={modalStyle} className={classes.paper}>
        <FormControl className="add_task">
          <input type="text" placeholder="Enter task title"/>
          <label>
            Assign To:
            <select value='Ahmad'>
              <option value='Ali'>Ali</option>
              <option value='Abu'>Abu</option>
              <option value='Ah Chong'>Ah Chong</option>
            </select>
          </label>
          <input type="text" placeholder="Enter task description"/>
          <input type="file"/>
          <Button variant="contained" color="primary">Upload</Button>
        </FormControl>
      </div>
    </Modal>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p:1, mr:5}}>
    <Button variant="contained" onClick={() => setOpenTask(true)} color="primary">Add Task</Button>
    </Box>

      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedtaskIds.length === tasks.length}
                      color="primary"
                      indeterminate={
                        selectedtaskIds.length > 0
                        && selectedtaskIds.length < tasks.length
                      }
                      onChange={handleSelectAll}
                    /> */}
                  </TableCell>
                  <TableCell>
                    Title
                  </TableCell>
                  <TableCell>
                    Assigned to
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Due Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.slice(0, limit).map((task) => (
                  <TableRow
                    hover
                    key={task.id}
                    selected={selectedtaskIds.indexOf(task.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        checked={selectedtaskIds.indexOf(task.id) !== -1}
                        onChange={(event) => handleSelectOne(event, task.id)}
                        value="true"
                      /> */}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {/* <Avatar
                          src={task.avatarUrl}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(task.name)}
                        </Avatar> */}
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {task.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {task.email}
                    </TableCell>
                    <TableCell>
                      {task.status}
                    </TableCell>
                    <TableCell>
                      {moment(task.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={tasks.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

TaskListResults.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskListResults;
