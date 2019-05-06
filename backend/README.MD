## At your current root dir, cd into backend/src folder
`cd backend/src`
## Set up the python virtual environment
`pipenv install`
## Start the Django server
`python manage.py runserver`
The server should be started on `http://127.0.0.1:8000/`
## API list
1. List view of todos (GET,POST): 
* `http://127.0.0.1:8000/todo/`
2. Single view of one todo (GET,PUT,DELETE): 
* `http://127.0.0.1:8000/todo/<id>/`
3. List view with filter by due_date (GET): 
* `http://127.0.0.1:8000/todo/date/?date=<yyyy-mm-dd>`
4. List view with filter by state (GET): 
* `http://127.0.0.1:8000/todo/state/?state=<state>` 
* parameters=`finished,not_finished,in_progress,not_in_progress`
5. Bulk delete with given ids (GET): 
* `http://127.0.0.1:8000/todo/bulkDel/?id=<di>` 
* parameters in format: `id1,id2,id3`
