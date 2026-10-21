import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Scanner;

class Passenger {
    String name;
    int priority;
    int order;

    Passenger(String name, int priority, int order) {
        this.name = name;
        this.priority = priority;
        this.order = order;
    }
}

public class AirportSystem {
    private static final Queue<Passenger> checkInQueue = new LinkedList<>();

    // Priority 2 is processed before priority 1.
    // Passengers with the same priority are processed in arrival order.
    private static final PriorityQueue<Passenger> boardingQueue =
            new PriorityQueue<>((a, b) -> {
                if (a.priority != b.priority) {
                    return Integer.compare(b.priority, a.priority);
                }
                return Integer.compare(a.order, b.order);
            });

    private static int count = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\nAIRPORT CHECK-IN AND BOARDING SYSTEM");
            System.out.println("1. Add Passenger");
            System.out.println("2. Process Check-in");
            System.out.println("3. Display Waiting Passengers");
            System.out.println("4. Display Boarding Queue");
            System.out.println("5. Board Passenger");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            if (!sc.hasNextInt()) {
                System.out.println("Please enter a number from 1 to 6.");
                sc.nextLine();
                choice = 0;
                continue;
            }

            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter passenger name: ");
                    String name = sc.nextLine().trim();

                    if (name.isEmpty()) {
                        System.out.println("Passenger name cannot be empty.");
                        break;
                    }

                    System.out.println("1. Regular");
                    System.out.println("2. Priority");
                    System.out.print("Enter boarding priority: ");

                    if (!sc.hasNextInt()) {
                        System.out.println("Please enter 1 or 2.");
                        sc.nextLine();
                        break;
                    }

                    int priority = sc.nextInt();
                    sc.nextLine();

                    if (priority != 1 && priority != 2) {
                        System.out.println("Invalid priority! Enter 1 or 2.");
                        break;
                    }

                    Passenger p = new Passenger(name, priority, count++);
                    checkInQueue.add(p);
                    System.out.println("Passenger added to check-in queue.");
                    break;

                case 2:
                    if (checkInQueue.isEmpty()) {
                        System.out.println("No passengers waiting for check-in.");
                    } else {
                        Passenger checkedIn = checkInQueue.remove();
                        boardingQueue.add(checkedIn);
                        System.out.println(checkedIn.name + " checked in successfully.");
                    }
                    break;

                case 3:
                    if (checkInQueue.isEmpty()) {
                        System.out.println("No passengers waiting for check-in.");
                    } else {
                        System.out.println("Passengers waiting for check-in:");
                        for (Passenger x : checkInQueue) {
                            System.out.println(x.name);
                        }
                    }
                    break;

                case 4:
                    if (boardingQueue.isEmpty()) {
                        System.out.println("No passengers waiting for boarding.");
                    } else {
                        PriorityQueue<Passenger> temp = new PriorityQueue<>(boardingQueue);
                        System.out.println("Passengers in boarding order:");
                        while (!temp.isEmpty()) {
                            Passenger x = temp.remove();
                            String type = (x.priority == 2) ? "Priority" : "Regular";
                            System.out.println(x.name + " - " + type);
                        }
                    }
                    break;

                case 5:
                    if (boardingQueue.isEmpty()) {
                        System.out.println("No passengers ready for boarding.");
                    } else {
                        Passenger boarded = boardingQueue.remove();
                        System.out.println(boarded.name + " has boarded the flight.");
                    }
                    break;

                case 6:
                    System.out.println("Exiting the system.");
                    break;

                case 0:
                    // Invalid menu input; show the menu again.
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 6);

        sc.close();
    }
}
