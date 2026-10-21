# Airport Check-in and Boarding System Using Data Structures

## Project Description
This Java console application demonstrates how Queue and Priority Queue data structures can be used to manage airport passengers.

## Data Structures Used
- **Queue:** Manages passengers waiting for check-in using the First-In-First-Out (FIFO) principle.
- **Priority Queue:** Manages checked-in passengers by boarding priority. Priority passengers (priority 2) are selected before regular passengers (priority 1). Passengers with equal priority are selected in their check-in order.

## Features
- Add passengers to the check-in queue.
- Process check-in in arrival order.
- Display passengers waiting for check-in.
- Display passengers in boarding priority order.
- Board the next passenger according to priority.

## Requirements
- Java Development Kit (JDK)
- Terminal/Command Prompt or a Java IDE

## How to Compile and Run
1. Download or clone this repository.
2. Open a terminal or Command Prompt in the folder containing `AirportSystem.java`.
3. Compile the program:
   ```bash
   javac AirportSystem.java
   ```
4. Run the program:
   ```bash
   java AirportSystem
   ```

## How to Use
Choose a number from the menu. Add a passenger by entering their name and selecting `1` for Regular or `2` for Priority. Process check-in for each passenger before they appear in the boarding queue.

## Author
Merlin Mariam Ajish

## Purpose
Prepared as a Data Structures mini project for educational purposes.
