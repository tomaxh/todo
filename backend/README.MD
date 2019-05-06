## At your current root dir, cd into backend/src folder
`cd backend/src`
## Set up the python virtual environment
`pipenv install`
## Start the Django server
`python manage.py runserver`
The server should be started on `http://127.0.0.1:8000/`
## API list
List view of todos (GET,POST): `http://127.0.0.1:8000/todo/`
Single view of one todo (GET,PUT,DELETE): `http://127.0.0.1:8000/todo/<id>/`
List view with filter by due_date (GET): `http://127.0.0.1:8000/todo/date/?date=<yyyy-mm-dd>`
List view with filter by state (GET): `http://127.0.0.1:8000/todo/state/?state=<state>` parameters=`finished,not_finished,in_progress,not_in_progress`
Bulk delete with given ids (GET): `http://127.0.0.1:8000/todo/bulkDel/?id=<di>` parameters in format: `id1,id2,id3`