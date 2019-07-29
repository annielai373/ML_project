libname datme "D:\Dropbox\1 Data Bootcamp\Machine Learning Project";

libname eprod "D:\Github\ML_SAS\eproduce";


proc import datafile= "D:\Github\ML_SAS\eproduce\all_energy_production.txt"
out= eprod.eproduce_yr
 dbms = dlm
 replace;
 delimiter = '09'x;
run;


data eprod.eproduce;
set eprod.eproduce;
format year YEAR4. ;
run;

*Converts to READ year but does NOT allow ML to work;
data eprod.eproduce_yr;
set eprod.eproduce_yr;
year = mdy(1, 1, year);
run;


data eprod.eproduce_copy; 
set eprod.eproduce;
run;
