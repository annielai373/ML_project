libname datme "D:\Dropbox\1 Data Bootcamp\Machine Learning Project";

libname eprod "D:\Github\ML_SAS\eproduce";


proc import datafile= "D:\Github\ML_SAS\eproduce\all_energy_production.txt"
out= eprod.eproduce
 dbms = dlm
 replace;
 delimiter = '09'x;
run;


data eprod.eproduce;
set eprod.eproduce;
format year YEAR4. ;
run;


data eprod.eproduce_copy; 
set eprod.eproduce;
run;
