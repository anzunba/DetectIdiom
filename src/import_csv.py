import csv
from edit.models import En_Ja
with open('/Users/anna/Desktop/ja_db_table.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        p = En_Ja(word=row['word'],mean=row['mean'])
        p.save()
        
# To execute 
# $python manage.py shell < import_csv.py 