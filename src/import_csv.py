import csv
from edit.models import EnJa
with open('/Users/anna/Desktop/ja_db_table2.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        p = EnJa(word=row['word'],mean=row['mean'])
        p.save()
        
# To execute 
# $python manage.py shell < import_csv.py 