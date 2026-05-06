package com.finance.taskmanager;

import com.finance.taskmanager.model.Task;
import com.finance.taskmanager.repository.TaskRepository;
import com.finance.taskmanager.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskmanagerApplicationTests {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus("PENDING");
        task.setPriority("HIGH");
        task.setCategory("Riesgo");
    }

    @Test
    void getAllTasks_returnsListOfTasks() {
        when(taskRepository.findAll()).thenReturn(List.of(task));
        List<Task> tasks = taskService.getAllTasks();
        assertEquals(1, tasks.size());
        assertEquals("Test Task", tasks.get(0).getTitle());
    }

    @Test
    void createTask_savesAndReturnsTask() {
        when(taskRepository.save(task)).thenReturn(task);
        Task created = taskService.createTask(task);
        assertNotNull(created);
        assertEquals("Test Task", created.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void updateStatus_changesTaskStatus() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);
        Task updated = taskService.updateStatus(1L, "COMPLETED");
        assertEquals("COMPLETED", updated.getStatus());
    }
}