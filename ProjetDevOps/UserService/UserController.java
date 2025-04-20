@RestController
public class UserController {
    List<String> users = new ArrayList<>();

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody String name) {
        users.add(name);
        return ResponseEntity.ok("User added");
    }

    @GetMapping("/users")
    public List<String> getUsers() {
        return users;
    }
}
