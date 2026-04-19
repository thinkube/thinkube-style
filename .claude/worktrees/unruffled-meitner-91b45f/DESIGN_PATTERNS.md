# Thinkube Design Patterns & Usage Guidelines

**Purpose:** Clear criteria for choosing between UI patterns to maintain consistency across all three applications (installer, control, template).

**Problem:** Without clear guidelines, developers make inconsistent choices (e.g., using a modal when a card would be better, or vice versa).

---

## 1. Modal/Dialog vs Inline Content

### Use Modal/Dialog When:
- ✅ **Action requires focus** - User must complete or cancel before continuing
- ✅ **Confirmation needed** - "Are you sure you want to delete?"
- ✅ **Multi-step form** - Wizard flow that shouldn't clutter main view
- ✅ **Transient action** - Create/edit something temporarily
- ✅ **Critical warning** - Destructive action needs attention

**Examples:**
```tsx
// Good: Modal for confirmation
<AlertDialog>
  <AlertDialogContent>
    <AlertDialogTitle>Delete cluster?</AlertDialogTitle>
    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
  </AlertDialogContent>
</AlertDialog>

// Good: Modal for create form
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Template</DialogTitle>
    </DialogHeader>
    <form>...</form>
  </DialogContent>
</Dialog>
```

### Use Inline Content (Cards/Sections) When:
- ✅ **Information is reference** - User needs to see it alongside other content
- ✅ **No immediate action required** - Just displaying data
- ✅ **Part of main workflow** - User will interact with multiple items
- ✅ **Persistent state** - Should remain visible while working

**Examples:**
```tsx
// Good: Card for persistent info
<Card>
  <CardHeader>
    <CardTitle>Cluster Status</CardTitle>
  </CardHeader>
  <CardContent>
    <StatCard title="Nodes" value={nodeCount} />
  </CardContent>
</Card>
```

### ❌ Anti-Patterns:
- **Don't use modal for read-only info** that should be accessible alongside other content
- **Don't use inline forms** for critical/destructive actions (use modal for confirmation)
- **Don't nest modals** (use multi-step wizard or split into separate flows)

---

## 2. Cards vs Tables vs Lists

### Use Table When:
- ✅ **Comparing rows** - Users need to scan across columns
- ✅ **Many columns** - More than 3-4 data points per item
- ✅ **Sortable data** - Users need to sort by column
- ✅ **Dense data** - Lots of items, space is limited
- ✅ **Homogeneous data** - All items have same structure

**Examples:**
```tsx
// Good: Table for dense, comparable data
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Node</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>CPU</TableHead>
      <TableHead>Memory</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {nodes.map(node => (
      <TableRow key={node.id}>
        <TableCell>{node.name}</TableCell>
        <TableCell><Badge>{node.status}</Badge></TableCell>
        <TableCell>{node.cpu}%</TableCell>
        <TableCell>{node.memory}%</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Use Cards When:
- ✅ **Rich content** - Images, icons, multiple sections
- ✅ **Heterogeneous items** - Items have different structures
- ✅ **Actionable items** - Each card has buttons/actions
- ✅ **Visual hierarchy** - Need clear separation between items
- ✅ **Fewer items** - 10-20 items max (not hundreds)

**Examples:**
```tsx
// Good: Cards for rich, actionable items
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {services.map(service => (
    <Card key={service.id}>
      <CardHeader>
        <service.icon className="w-8 h-8 text-primary mb-2" />
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Configure</Button>
        <Button variant="outline">Details</Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

### Use Simple List When:
- ✅ **Single dimension** - Just names or simple items
- ✅ **Navigation** - Links to other pages
- ✅ **Vertical scanning** - Users read top-to-bottom only
- ✅ **Minimal info per item** - 1-2 data points

**Examples:**
```tsx
// Good: Simple list for navigation
<div className="space-y-2">
  {items.map(item => (
    <div key={item.id} className="flex items-center gap-2 p-2 hover:bg-hover rounded">
      <item.icon className="w-4 h-4" />
      <span>{item.name}</span>
    </div>
  ))}
</div>
```

### Decision Tree:

```
Need to display multiple items?
├─ More than 4 data points per item? → TABLE
├─ Need sorting/filtering? → TABLE
├─ Rich content (images, actions)? → CARDS
├─ Simple navigation? → LIST
└─ 2-3 data points, scannable? → Depends:
   ├─ Need to compare across? → TABLE
   └─ Independent items? → CARDS or LIST
```

---

## 3. Stats Display

### Use StatCard When:
- ✅ **Single metric** - One value with context
- ✅ **Dashboard overview** - 2-6 key metrics
- ✅ **Glanceable info** - Should be instantly readable
- ✅ **Includes trend** - Up/down indicators

**Example:**
```tsx
// Good: StatCards for dashboard metrics
<div className="grid md:grid-cols-4 gap-4">
  <StatCard title="Total Clusters" value="12" icon={Server} trend={{ value: 20, direction: "up" }} />
  <StatCard title="Active Users" value="348" icon={Users} trend={{ value: 12, direction: "up" }} />
</div>
```

### Use Table for Stats When:
- ✅ **Comparing multiple items** - Per-node, per-cluster stats
- ✅ **Many rows** - More than 6-8 items

---

## 4. Forms

### Use Inline Form When:
- ✅ **Simple input** - 1-3 fields
- ✅ **Non-critical** - Edits can be abandoned without loss
- ✅ **Part of workflow** - Embedded in larger page

### Use Modal Form When:
- ✅ **Create new item** - Needs focus
- ✅ **Multi-step** - Wizard flow
- ✅ **Critical data** - Important not to lose focus

### Use Full Page Form When:
- ✅ **Complex configuration** - Many sections
- ✅ **Save as draft** - Long form, needs persistence
- ✅ **Main purpose** - Entire page is about this form

---

## 5. Feedback/Notifications

### Use Toast When:
- ✅ **Success confirmation** - "Settings saved"
- ✅ **Non-blocking** - User can ignore
- ✅ **Transient** - Auto-dismiss after 3-5 seconds

### Use Alert (inline) When:
- ✅ **Contextual warning** - Related to current section
- ✅ **Persistent** - Should stay visible
- ✅ **Informational** - Not blocking, but important

### Use AlertDialog When:
- ✅ **Requires action** - Must acknowledge or cancel
- ✅ **Critical error** - Cannot proceed without resolving
- ✅ **Destructive action** - Confirmation needed

---

## 6. Navigation

### Use Vertical Sidebar When:
- ✅ **Main navigation** - Primary app sections
- ✅ **Persistent** - Always visible
- ✅ **Hierarchical** - Groups and sub-items
- ✅ **Icon + text** - Visual + label

### Use Horizontal Tabs When:
- ✅ **Section switcher** - Different views of same entity
- ✅ **Related content** - All tabs are about same context
- ✅ **3-6 options** - Not too many

### Use Dropdown Menu When:
- ✅ **Actions menu** - Context actions (edit, delete, etc.)
- ✅ **User menu** - Profile, settings, logout
- ✅ **Many options** - More than 6 items

---

## 7. Loading States

### Use Spinner When:
- ✅ **Short wait** - 0-3 seconds
- ✅ **Unknown duration** - Can't estimate time
- ✅ **Button action** - Inline in button

### Use Progress Bar When:
- ✅ **Known duration** - Can estimate percentage
- ✅ **Long operation** - More than 3 seconds
- ✅ **Multi-step** - Show overall progress

### Use Skeleton When:
- ✅ **Page load** - Initial data fetch
- ✅ **Preserves layout** - Prevents layout shift
- ✅ **List/grid** - Multiple items loading

---

## Common Scenarios in Thinkube Apps

### Installer App

| Scenario | Pattern |
|----------|---------|
| 12-step wizard | Full page with **Subway Line Progress** indicator (horizontal) |
| Hardware detection results | **Table** (comparing nodes) or **Cards** (if <5 nodes) |
| Network configuration form | **Inline form** (part of wizard step) |
| Ansible log streaming | **Scrollable div** with Ansible log utils (not modal) |
| Confirmation before deploy | **AlertDialog** (critical action) |
| Success notification | **Toast** (auto-dismiss) |

### Control App

| Scenario | Pattern |
|----------|---------|
| Dashboard metrics | **StatCards** (grid layout, 4-6 metrics) |
| Template list | **Table** (if many) or **Cards** (if <20, need actions) |
| Harbor image browser | **Table** with search/filter |
| Service configuration | **Modal Form** (create) or **Full Page** (complex config) |
| Playbook execution | **Modal** with Ansible log display |
| Node status | **Table** (comparing resources across nodes) |

### Template App

| Scenario | Pattern |
|----------|---------|
| Service cards | **Cards** (visual, actionable) |
| User list | **Table** (many users, comparable data) |
| Settings | **Full Page** with sections |
| Quick actions | **Dropdown Menu** |

---

## Anti-Pattern Examples

### ❌ Don't: Modal for Read-Only Info
```tsx
// Bad: Modal blocks workflow
<Dialog>
  <DialogContent>
    <DialogHeader>Node Details</DialogHeader>
    <p>CPU: 40%, Memory: 60%</p>
  </DialogContent>
</Dialog>

// Good: Inline card or expandable row
<Card>
  <CardHeader>Node Details</CardHeader>
  <CardContent>
    <p>CPU: 40%, Memory: 60%</p>
  </CardContent>
</Card>
```

### ❌ Don't: Cards When Table is Better
```tsx
// Bad: Hard to compare across items
<div className="grid grid-cols-3 gap-4">
  {nodes.map(node => (
    <Card key={node.id}>
      <CardContent>
        <div>Name: {node.name}</div>
        <div>CPU: {node.cpu}%</div>
        <div>Memory: {node.memory}%</div>
      </CardContent>
    </Card>
  ))}
</div>

// Good: Table for comparison
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>CPU</TableHead>
      <TableHead>Memory</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {nodes.map(node => (
      <TableRow key={node.id}>
        <TableCell>{node.name}</TableCell>
        <TableCell>{node.cpu}%</TableCell>
        <TableCell>{node.memory}%</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### ❌ Don't: Table When Cards are Better
```tsx
// Bad: Table for rich, actionable items loses visual hierarchy
<Table>
  <TableBody>
    <TableRow>
      <TableCell><img src={icon} /></TableCell>
      <TableCell>Service Name</TableCell>
      <TableCell>Long description...</TableCell>
      <TableCell><Button>Action</Button></TableCell>
    </TableRow>
  </TableBody>
</Table>

// Good: Cards for rich content
<Card>
  <CardHeader>
    <Icon className="w-8 h-8" />
    <CardTitle>Service Name</CardTitle>
    <CardDescription>Long description...</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## Migration Checklist

When migrating a Vue component, ask:

1. **Is this a modal?**
   - Does it block the user? → Dialog/AlertDialog
   - Or is it just content? → Make it inline

2. **Is this a list of items?**
   - Need to compare data? → Table
   - Rich content/actions? → Cards
   - Simple navigation? → List

3. **Is this a metric?**
   - Single key value? → StatCard
   - Multiple comparable? → Table

4. **Is this a form?**
   - Critical/create? → Modal
   - Complex config? → Full page
   - Simple edit? → Inline

5. **Is this feedback?**
   - Success? → Toast
   - Warning? → Alert
   - Requires action? → AlertDialog

---

## Status: ✅ GUIDELINES ESTABLISHED

These patterns will ensure consistency during migration and prevent the "when to use what" confusion.

**Next Steps:**
1. Review these guidelines
2. Apply during migration
3. Update if patterns emerge during actual migration work
