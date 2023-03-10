import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../courses/service/course.service';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/courses/model/course.model';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  dataSource!: MatTableDataSource<Course>;
  suscripcion!: Subscription;
  columnas: string[] = ['name', 'description', 'duration', 'actions']

  constructor(private courseService: CourseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.courseService.triggerMethod.subscribe(() => {
      this.refresh()
    });

    this.dataSource = new MatTableDataSource<Course>();

    this.suscripcion = this.courseService.getCourses().subscribe((cursos: Course[]) => {
      this.dataSource.data = cursos;
    });
  }

  public refresh() {
    this.dataSource = new MatTableDataSource<Course>();

    this.suscripcion = this.courseService.getCourses().subscribe((cursos: Course[]) => {
      this.dataSource.data = cursos;
    });

    this.dialog.closeAll();
  }

  editCourse(course: Course) {
    this.dialog.open(EditCourseDialogComponent, {
      data: course
    });
  }

  deleteCourse(idCourse: number) {
    this.courseService.deleteCourse(idCourse);
    alert("Press accept to finish with the delete");
    this.refresh();
  }
}

